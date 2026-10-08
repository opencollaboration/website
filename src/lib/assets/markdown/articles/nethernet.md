---
title: "Goodbye RakNet: Welcome NetherNet"
description: "NetherNet is a major breaking change in Minecraft: Bedrock edition, which will change how clients and servers connect and communicate."
date: "2026-10-09"
author: "Chris"
slug: "nethernet"
---

With Minecraft: Bedrock Edition 26.60, [planned for October 27](https://minecraft.wiki/w/Bedrock_Edition_26.60), Bedrock clients will stop connecting over RakNet. 
From then on, every Bedrock server has to speak NetherNet, the new transport Mojang has been rolling out since 26.40. 
That affects everyone who runs Bedrock or crossplay servers, from a single self-hosted Geyser instance to hosting providers and large networks.

Most Bedrock server software already supports NetherNet, including Geyser since build 1237. In this post, we explain what NetherNet changes, 
why it is harder to operate at scale than RakNet, and what we have built to help: NetherNet External Signaling (NXS), an open standard for running signaling outside the game server. 
Our reference implementation is open source and part of [CloudburstMC/Network](https://github.com/CloudburstMC/Network).

If you run a Geyser server and just want to know what to do, the Geyser blog has a step-by-step guide: \[LINK: Geyser migration guide\].

## What's changing?

Under RakNet, a client sent UDP packets to a server's address and port, and that was the whole connection. NetherNet splits this into two steps.

The first step is signaling. Before joining, the client sends an HTTP(S) request to the server to ask whether it supports NetherNet; 
the same kind of request also fetches the MOTD and player count shown in the server list. The server answers with the details the client needs to connect.

The second step is the game connection itself, which runs over WebRTC, the same open standard browsers use for video calls. 
Mojang documents the signaling side in its [NetherNet HTTP Signaling onboarding guide](https://mojang.github.io/bedrock-protocol-docs/guides/nether-net-onboarding-guide/).

<figure class="diagram">
<svg viewBox="0 0 760 296" role="img" aria-labelledby="nn-title" font-size="13">
<title id="nn-title">How a Bedrock client joins a server over NetherNet</title>
<defs><marker id="nn-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path class="edge-fill" d="M0 0L10 5L0 10z"/></marker></defs>
<g class="edge" fill="none" stroke-width="1.25"><path d="M204 88H456" marker-end="url(#nn-arrow)"/><path d="M456 116H204" marker-end="url(#nn-arrow)"/><path d="M114 132V240H456" marker-end="url(#nn-arrow)"/></g>
<rect class="edge" x="24" y="68" width="180" height="64" rx="8" fill="none" stroke-width="1.25"/>
<text class="ink" x="114" y="105" text-anchor="middle" font-size="15" font-weight="600">Bedrock client</text>
<rect class="accent" x="456" y="68" width="280" height="64" rx="8" stroke-width="2"/>
<text class="ink" x="596" y="95" text-anchor="middle" font-size="15" font-weight="600">Signaling server</text>
<text class="quiet" x="596" y="117" text-anchor="middle" font-size="11.5">Built into the server, or external (NXS)</text>
<rect class="edge" x="456" y="212" width="280" height="56" rx="8" fill="none" stroke-width="1.25"/>
<text class="ink" x="596" y="245" text-anchor="middle" font-size="15" font-weight="600">Game server</text>
<text class="quiet" x="330" y="80" text-anchor="middle" font-size="11.5">1. Request: server info and join</text>
<text class="quiet" x="330" y="134" text-anchor="middle" font-size="11.5">2. Answer: where to connect</text>
<text class="quiet" x="285" y="232" text-anchor="middle" font-size="11.5">3. Gameplay over WebRTC (UDP)</text>
</svg>
<figcaption>NetherNet join flow: signaling first, then gameplay.</figcaption>
</figure>

Building on WebRTC means Bedrock now uses a widely deployed, actively maintained standard instead of a protocol only games use. 
Signaling also gives servers information they did not have before: the MOTD request includes the address the client pinged, so a server can tell which address a player used.

## Why signaling is hard to run at scale

A RakNet server needed one open UDP port. A NetherNet server that does its own signaling also needs a TCP port. For Geyser users, that port cannot be the Java server's port, 
since Java uses TCP too. On shared hosting, where many servers sit behind one IP address, that means handing out a second port for every crossplay server.

Then there is HTTPS. Signaling works over plain HTTP, but players then see a "trust on first use" prompt the first time they join. 
Avoiding it means getting, installing and renewing a certificate for every server.

Finally, gameplay still needs UDP, and implementations differ in how much of it. Some, such as BDS, open one UDP port per player, 
which means opening a whole port range for each server.

For one self-hosted server, all of this is manageable. For a hosting provider with thousands of servers, or a network 
with dozens of backends, it adds up quickly. That is the gap NXS is meant to close.

## Introducing NXS

NetherNet External Signaling lets a game server hand its signaling to a separate service, a provider, chosen by the server's operator. 
Players still connect directly to the game server; the provider only takes part in signaling and never carries gameplay traffic.

The protocol has three parts. When a server starts, it registers with its provider. 
While it runs, it sends regular heartbeats that report whether it is accepting players, 
how much capacity it has, how many players are online and which public addresses it can be reached on. 
When a player wants to join, the provider answers their signaling request and gives them a short-lived ticket. 
The player presents that ticket to the game server in their first packet, and the server later tells the provider whether the join succeeded.

The specification is published under the Apache-2.0 license, together with a JSON schema and test fixtures, in [CloudburstMC/Network](https://github.com/CloudburstMC/Network/tree/nethernet/docs/external-signaling). 
It is still marked experimental and is updated in place. Geyser fully supports it, and [Warden](https://warden.cloud), operated by Ziax, is a public provider and Geyser's default.

<figure class="diagram">
<svg viewBox="0 0 760 320" role="img" aria-labelledby="nxs-title" font-size="13">
<title id="nxs-title">How a join works with NXS</title>
<defs><marker id="nxs-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path class="edge-fill" d="M0 0L10 5L0 10z"/></marker></defs>
<g class="edge" fill="none" stroke-width="1.25"><path d="M90 236V84H270" marker-end="url(#nxs-arrow)"/><path d="M270 112H138V236" marker-end="url(#nxs-arrow)"/><path d="M690 236V84H490" marker-end="url(#nxs-arrow)"/><path d="M600 236V112H490" marker-end="url(#nxs-arrow)"/><path d="M204 266H556" marker-end="url(#nxs-arrow)"/></g>
<rect class="accent" x="270" y="64" width="220" height="64" rx="8" stroke-width="2"/>
<text class="ink" x="380" y="91" text-anchor="middle" font-size="15" font-weight="600">NXS provider</text>
<text class="quiet" x="380" y="113" text-anchor="middle" font-size="11.5">Signaling only, no gameplay</text>
<rect class="edge" x="24" y="236" width="180" height="60" rx="8" fill="none" stroke-width="1.25"/>
<text class="ink" x="114" y="271" text-anchor="middle" font-size="15" font-weight="600">Bedrock client</text>
<rect class="edge" x="556" y="236" width="180" height="60" rx="8" fill="none" stroke-width="1.25"/>
<text class="ink" x="646" y="262" text-anchor="middle" font-size="15" font-weight="600">Game server</text>
<text class="quiet" x="646" y="283" text-anchor="middle" font-size="11.5">Checks the ticket itself</text>
<text class="quiet" x="180" y="76" text-anchor="middle" font-size="11.5">1. Join request</text>
<text class="quiet" x="146" y="170" font-size="11.5">2. Answer + ticket</text>
<text class="quiet" x="590" y="76" text-anchor="middle" font-size="11.5">Register, heartbeat</text>
<text class="quiet" x="592" y="170" text-anchor="end" font-size="11.5">Outcome reports</text>
<text class="quiet" x="380" y="256" text-anchor="middle" font-size="11.5">3. Gameplay over UDP, ticket in the first packet</text>
</svg>
<figcaption>NXS join flow: the provider signals, the server admits.</figcaption>
</figure>

With NXS, a game server no longer needs a TCP port or a certificate of its own, only a reachable UDP port. 
And because a single provider can handle signaling for many servers at once, the work of running it moves to one place.

## How NXS is designed

A signaling provider sits in front of many servers, so it must not become a new single point of failure or a way to lock operators in. Most of the design follows from that.

Admission does not depend on a live connection to the provider. The ticket a player receives is encrypted for the target server and travels inside the player's very first packet. The server checks it on its own, confirming that it is genuine, unexpired and issued for this connection, before it sets up anything for the player. Tickets are valid for at most 120 seconds. Because the check happens before any connection state exists, packets without a valid ticket are cheap to drop.

Tickets are also tied to the player. The provider verifies the player's identity during signaling and binds the ticket to it; once the player logs in, the game server checks that the login matches. A copied ticket is of no use to anyone else, and the same ticket arriving from a different address is rejected.

The game server stays in control. A provider can stop routing new players to a server, but it can never tell the server to drain or shut down. If a provider goes offline, players who are already connected stay connected.

Finally, NXS is provider-neutral. Any provider that implements the specification works, and a server can register without creating an account. In Geyser, switching providers is a single config setting. For larger deployments, each server can publish several public addresses, such as IPv4, IPv6 and NAT-mapped ones, and the provider routes players based on the health and capacity each server reports.

## Our implementation

Our NetherNet work lives in [CloudburstMC/Network](https://github.com/CloudburstMC/Network), the networking library many Bedrock projects already depend on. 
It contains the NetherNet transport, built-in HTTP and HTTPS signaling, and both sides of NXS. Under the hood it uses libdatachannel, an open-source WebRTC library, through our [libdatachannel-java](https://github.com/opencollab-incubator/libdatachannel-java) bindings.

Besides Geyser, the library is used by various other FOSS projects, so improvements land in all of them at once.

The main features include, but are not limited to being able to use RakNet next to NetherNet, integration for NXS providers,
and multiplexing of WebRTC connections (instead of using one IP:port combination per player, as BDS currently requires). 
Further, signaling is built-in, so less additional wiring is required.

## What this means for hosting providers

Geyser is used widely across the ecosystem, so many of your customers will need working NetherNet support by October 27. There are two ways to provide it.

The simplest is to give each server a TCP port alongside its UDP port. Both can use the same number, as long as it is not the Java server's port. 
This is the recommended approach, as it avoids breaking changes for existing servers, due to Geyser's built-in signaling then working without further setup. 

However, users of the `clone-remote-port` option today will need to ask clients to change the port used, as built-in signaling cannot share the port with other TCP applications,
such as a Java server.

In case the signaling port is already being used, Geyser will fall back to external signaling; which will also force clients to change the IP and port used to connect to the server.

The other option is to run an NXS provider of your own, so that one central service handles signaling for every server you host. Your customers then need neither a TCP port nor a certificate. Geyser can be configured for this through system properties, which take precedence over the customer's config file:

- `-DgeyserTransport` sets the transport.
- `-DgeyserSignalingMode` selects external signaling, so Geyser does not start its own.
- `-DgeyserWebrtcPort` sets the UDP port for gameplay.
- `-DgeyserSignalingPort` and `-DgeyserRaknetPort` set the signaling and RakNet ports, if you route them separately.

NXS is still experimental, and feedback from hosts at this stage will shape where it goes. If you are considering running your own provider, or would like to build one together with us, we would like to hear from you!

## For the rest of the ecosystem

NetherNet affects more than game servers. Proxies, networks, anti-DDOS protection services and others will need to adapt as well, 
and we would encourage them to look at NXS for routing players at the edge. A shared, open standard means proxies, providers and servers can work together without a custom integration for every pair.

We also recommend supporting multiplexing, meaning many WebRTC connections on one UDP port. 
Google's default WebRTC implementation handles only one connection per IP address and port; our library multiplexes, 
which is why Geyser needs just one port for all players. And since [CloudburstMC/Network](https://github.com/CloudburstMC/Network) is open source and already widely used, 
building on it means fixes and improvements are shared across projects.

## Thank you

This work began early in 2026, and it would not have been possible without the members of Open Collaboration, who funded it early. 
We also want to thank [Kas-tle](https://github.com/Kas-tle), whose early NetherNet transport in [NetworkCompatible](https://github.com/Kas-tle/NetworkCompatible)
and first NetherNet support in CloudburstMC/Network got this started; [rtm516](https://github.com/rtm516), for HTTP signaling and the move to libdatachannel; 
and [irrld](https://github.com/irrld), for bringing NetherNet and NXS into Geyser and further improvements on existing work. 
Thank you as well to CubeCraft Games for their support in developing the specification 
and for providing a free Warden tier, and to the many developers implementing NetherNet across our projects.

If you have questions, feel free to [reach out to us](/contact/).
