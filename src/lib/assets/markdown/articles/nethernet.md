---
title: "Goodbye RakNet, hello NetherNet"
description: "Minecraft: Bedrock Edition is replacing RakNet with NetherNet, which changes how clients connect to servers. Here is what that means and what we built for it."
date: "2026-10-09"
author: "Chris"
slug: "nethernet"
---

With Minecraft: Bedrock Edition 26.60, [planned for October 27](https://minecraft.wiki/w/Bedrock_Edition_26.60), Bedrock clients will stop connecting over RakNet. From then on, every Bedrock server has to support NetherNet, the new transport Mojang has been rolling out since 26.40. This affects everyone who runs Bedrock or crossplay servers, from a single self-hosted Geyser instance to large networks and hosting providers.

At Open Collaboration, the organization behind Geyser, CloudburstMC and Boar, we have been working on NetherNet support since early 2026. The result is an implementation in [CloudburstMC/Network](https://github.com/CloudburstMC/Network), the networking library much of the Java-speaking Bedrock ecosystem uses, and Geyser has supported NetherNet through it since build 1237. This post explains what NetherNet changes, what it means for hosting providers, and what we built to help: NetherNet External Signaling (NXS), an open standard for running signaling outside the game server. Our reference implementation is open source and part of the same library.

## What's changing?

Under RakNet, a client sent UDP packets directly to a server's address and port. NetherNet adds a step before that, called signaling. Before joining, the client sends an HTTP(S) request to the server to ask whether it supports NetherNet; the same kind of request also fetches the MOTD and player count shown in the server list. The server answers with the details the client needs to connect. The game connection itself then runs over WebRTC, the open standard browsers use for things like video calls. Mojang documents the signaling side in its [NetherNet HTTP Signaling onboarding guide](https://mojang.github.io/bedrock-protocol-docs/guides/nether-net-onboarding-guide/).

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
<figcaption>Joining a server over NetherNet</figcaption>
</figure>

## Introducing NXS

Signaling adds complications: servers have to handle HTTPS, and Geyser now needs a TCP port in addition to its UDP port. It also opens up new possibilities. Server-list pings can carry more about the client, such as its version, platform and the full address it used. And because the signaling answer tells the client where to connect, routing players becomes much easier.

This is what NXS is for. We wrote a specification for moving signaling out of the game server: NetherNet External Signaling. With NXS, a game server hands its signaling to a separate service, a provider, chosen by the server's operator. Players still connect directly to the game server. The provider only handles signaling and never carries gameplay traffic.

The protocol has three parts. When a server starts, it registers with its provider. While it runs, it sends regular heartbeats reporting whether it is accepting players, its capacity, how many players are online, and which public addresses it can be reached on. When a player wants to join, the provider answers their signaling request and issues a short-lived ticket. The player presents that ticket to the game server in their first packet, and the server later reports to the provider whether the join succeeded.

The specification is published under the Apache-2.0 license, with a JSON schema and test fixtures, in [CloudburstMC/Network](https://github.com/CloudburstMC/Network/tree/nethernet/docs/external-signaling). It is still marked experimental and is updated in place. Geyser fully supports it, and [Warden](https://warden.cloud), operated by Ziax, is a public provider and Geyser's default.

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
<figcaption>Joining with NXS: the provider signals, the server admits</figcaption>
</figure>

With NXS, a game server no longer needs a TCP port or a certificate of its own, only a reachable UDP port.

## How NXS is designed

A signaling provider sits in front of many servers, so it must not become a new single point of failure or a way to lock operators in. Most of the design follows from that.

Admission does not depend on a live connection to the provider. The ticket a player receives is encrypted for the target server and travels inside the player's very first packet. The server checks it on its own, confirming that it is genuine, unexpired and issued for this connection, before it sets up anything for the player. Tickets are valid for at most 120 seconds. Because the check happens before any connection state exists, packets without a valid ticket are cheap to drop.

Tickets are also bound to the player. The provider verifies the player's identity during signaling and ties the ticket to it. Once the player logs in, the game server checks that the login matches. A copied ticket is of no use to anyone else, and the same ticket arriving from a different address is rejected.

The game server stays in control. A provider can stop routing new players to a server, but it can never tell the server to drain or shut down. If a provider goes offline, players who are already connected stay connected.

For larger deployments, each server can publish several public addresses, such as IPv4, IPv6 and NAT-mapped ones, and the provider routes players based on the health and capacity each server reports.

Finally, NXS is vendor-neutral. Any provider that implements the specification works, and a server can register without creating an account. In Geyser, switching providers is a single config setting. The same goes for the server side: any Bedrock software can implement NXS.

## Our implementation

Our NetherNet work lives in CloudburstMC/Network, the networking library many Bedrock projects already depend on, including Geyser and WDPE.

The library contains the NetherNet transport, built-in HTTP and HTTPS signaling, and both sides of NXS. Under the hood it uses libdatachannel, an open-source WebRTC library, through our [libdatachannel-java](https://github.com/opencollab-incubator/libdatachannel-java) bindings. Beyond that, it:

- runs RakNet alongside NetherNet, if desired;
- integrates with NXS providers;
- multiplexes WebRTC connections, so all players share one UDP port. Google's default WebRTC implementation handles only one connection per IP address and port, which is also why BDS currently needs a separate port per player;
- includes signaling, so server software does not need a separate component for it.

## What this means for hosting providers using Geyser

Geyser is widely used, so many of your customers will need working NetherNet support by October 27. The changes needed are covered in the [Geyser blog post](#TODO-link). We also encourage hosts to use NXS together with Geyser's system properties to configure Geyser for their users automatically. If you are considering running your own NXS provider across your instances, or would like to build one with us, we would like to hear from you. NXS is still early, and feedback from hosts at this stage will shape where it goes.

## For the rest of the ecosystem

NetherNet affects more than game servers. Proxies, networks, DDoS protection services and others will need to adapt as well. For routing players at the edge, we encourage them to look at NXS: with a shared, open standard, proxies, providers and servers can work together without a custom integration for every pair.

We also recommend supporting multiplexing. Without it, every player needs their own port. Building on CloudburstMC/Network gets you multiplexing, and fixes and improvements are shared with every other project that uses it.

## Thank you

We started this work in early 2026, and it would not have been possible without the members of Open Collaboration, who funded it from the start. We also want to thank [Kas-tle](https://github.com/Kas-tle), whose early NetherNet transport in [NetworkCompatible](https://github.com/Kas-tle/NetworkCompatible) and first NetherNet support in CloudburstMC/Network got this started; [rtm516](https://github.com/rtm516), for HTTP signaling and the move to libdatachannel; and [irrld](https://github.com/irrld), for bringing NetherNet and NXS into Geyser and improving the existing work. Thanks as well to CubeCraft Games for their support in developing the specification and for providing a free Warden tier, and to the many developers implementing NetherNet across our projects.

If you have questions, feel free to [contact us](/contact/)!
