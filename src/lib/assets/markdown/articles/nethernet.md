---
title: "Goodbye RakNet, hello NetherNet"
description: "Minecraft: Bedrock Edition is replacing RakNet with NetherNet, changing how clients connect to servers. Here is what that means and what we built for it."
date: "2026-10-15"
author: "Chris"
slug: "nethernet"
---

With Minecraft: Bedrock Edition 26.60, [planned for October 27](https://minecraft.wiki/w/Bedrock_Edition_26.60), Bedrock 
clients will stop connecting over RakNet. From then on, every Bedrock server has to support NetherNet, the new transport 
Mojang has been rolling out since 26.40. This affects everyone who runs Bedrock or crossplay servers, from a single self-hosted Geyser instance to large networks and hosting providers.

At Open Collaboration, the organization behind [Geyser](https://geysermc.org/), [CloudburstMC](https://cloudburstmc.org/), and [Boar](https://github.com/opencollab-incubator/Boar), 
we have been working on NetherNet support since early 2026. The result is an implementation in [CloudburstMC/Network](https://github.com/CloudburstMC/Network), 
the networking library used widely across the Bedrock ecosystem. Geyser has supported NetherNet through it since build 1237. 

This post explains what NetherNet changes and what we built to help: NetherNet External Signaling (NXS), 
an open standard for running signaling outside the game server. Our reference implementation is open source and part of the same library.

## What's changing?

Under RakNet, a client sent UDP packets directly to a server's address and port. NetherNet adds a step before that, called signaling. 
Before joining, the client sends an HTTP(S) request to the server to ask whether it supports NetherNet. The server answers with the details the client needs to establish a connection. 
The game connection itself then runs over WebRTC, an open standard browsers use for things like video calls. 

Similarly, MOTD and player count shown in the server list are fetched using HTTP(S) from a different endpoint.

Mojang documents this in its [NetherNet HTTP Signaling onboarding guide](https://mojang.github.io/bedrock-protocol-docs/guides/nether-net-onboarding-guide/).

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

## Introducing NetherNet External Signaling (NXS)

Signaling adds complexity to existing setups. Servers must expose another TCP port for signaling, and they must provide 
a certificate for TLS. But it also opens up new possibilities: Server-list pings include more details about the client, 
such as its version, platform and the full address it used. And because the server can directly tell the client where to connect, routing players is now much easier.

To better support these new use cases, we wrote a specification for moving signaling out of the game server: NetherNet External Signaling (NXS). 
With it, a game server can hand its signaling to a separate service, a "provider," chosen by the server's operator. 
Players still connect directly to the game server, so the provider only handles signaling and MOTD/player count queries, and never handles gameplay traffic.

The NXS protocol has three parts. When a server starts, it registers with its provider. While it runs, it sends regular heartbeats 
reporting whether it is accepting players, its capacity, and which public addresses it can be reached on. 
When a player wants to join, the provider answers their signaling request and issues a short-lived encrypted ticket. 
The player presents that ticket to the game server in their first packet, and the server later reports to the provider whether the join succeeded.

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

With NXS, a game server no longer needs a TCP port or a certificate of its own, only a reachable UDP port. This could also be used
by game server hosting providers to route users based on a custom domain or subdomain and handle certificate management centrally.
If you're interested in building your own NXS provider or would like to collaborate with us to build an open implementation,
feel free to [contact us](/contact/).

### Technical notes on external NetherNet signaling

It is worth noting that player joins do not depend on a live connection of the server to the external signaling provider. 
The server independently checks the encrypted ticket a player receives from the provider to confirm that it is genuine, 
unexpired, and issued for this connection, before anything is set up for the player. The signaling provider verifies the 
player's identity during signaling and ties the ticket to it. Tickets automatically expire 120 seconds after they are issued. 
This means that, even though the game server is exposed to the internet, it can easily drop connections not going through the provider. 

Further, the game server stays in control even when signaling is done externally. A provider can stop routing new players to a server, 
but it can never tell the server to drain or shut down. If a provider goes offline, players who are already connected stay connected. 

For larger deployments, it is also possible to let the provider route players to a registered server based on the health and capacity reported by each server.

The full V1 specification is published on the [CloudburstMC/Network repository](https://github.com/CloudburstMC/Network/tree/nethernet/docs/external-signaling) under the Apache-2.0 license.
Geyser fully supports it and uses [Warden](https://warden.cloud), operated by Ziax, as its default configured NXS provider.

Finally, the NXS standard is vendor-neutral. Any provider or server software that implements the specification will work interchangeably.
In Geyser, switching providers is a single config setting.

## Our implementation

Our NetherNet work can be found in [CloudburstMC/Network](https://github.com/CloudburstMC/Network/tree/nethernet/).

The library contains the NetherNet transport, built-in HTTP and HTTPS signaling, and the NXS specification and documentation. 
It uses [libdatachannel](https://github.com/paullouisageneau/libdatachannel), an open-source WebRTC library, through [libdatachannel-java](https://github.com/opencollab-incubator/libdatachannel-java) bindings. 
Beyond that, it supports running RakNet alongside NetherNet to make supporting older versions that don't support NetherNet possible.
It multiplexes WebRTC connections, so all players share one UDP port. This is worth noting, as Google's default WebRTC implementation 
handles only one connection per IP address and port, which is also why the Bedrock Dedicated Server (BDS) currently needs a separate port per player.

## What this means for Geyser users

Please see the [Geyser blog post](https://geysermc.org/blog/preparing-for-nethernet) for detailed information. Geyser has supported
NetherNet since build 1237, and will enable NetherNet by default with the 26.60 release. We encourage users to migrate early
and recommend that server hosts contribute updated configuration instructions to our setup guide.

## Thank you

Getting support out early, including a new standard, would not have been possible without the members of Open Collaboration, who supported and funded it. 
We also want to thank [Kas-tle](https://github.com/Kas-tle), whose early NetherNet transport in [NetworkCompatible](https://github.com/Kas-tle/NetworkCompatible) and first NetherNet support in CloudburstMC/Network got this started; 
[rtm516](https://github.com/rtm516), for HTTP signaling and the move to libdatachannel; and [irrld](https://github.com/irrld), for bringing NetherNet and NXS into Geyser and improving the existing work. 
Thanks as well to [Ziax](https://ziax.com/) for their support in developing the specification and for providing a free Warden tier, 
and to the many people helping out users with migrating from RakNet to NetherNet.
