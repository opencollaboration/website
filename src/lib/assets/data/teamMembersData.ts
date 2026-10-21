export interface TeamMember {
    name: string;
    role: string;
    description: string;
    image?: string;
    background?: string;
}

export const teamMembers: TeamMember[] = [
    {
        name: 'Chris',
        role: 'Project Lead',
        description:
            "I'm Chris! Currently leading Open Collaboration, maintaining Geyser, and studying. Passionate about OSS " +
            "and coding in Java.",
        image: '/resources/team/chris_profile.jpg',
        background: '/resources/team/chris_profile_bg.png'
    },
    {
        name: 'Zed',
        role: 'Managing Director, Ziax',
        description:
            'Ziax provides strategic guidance, funding and operational support to Open Collaboration.',
        image: '/resources/team/zed_profile.png',
        background: '/resources/team/zed_profile_bg.png'
    },
    {
        name: 'Auri',
        role: 'Community & Operations Coordinator',
        description:
            "I'm Auri! I'm a developer at Geyser and also help keep Open Collaboration running.",
        image: '/resources/team/auri_profile.png',
        background: '/resources/team/auri_profile_bg.png'
    },
    {
        name: 'Eclipse',
        role: 'Developer',
        description:
            "I'm Eclipse. My main focus lies on maintaining Geyser, but you'll see me contribute to other projects as well.",
        image: '/resources/team/eclipse_profile.png'
    },
    {
        name: 'Owen',
        role: 'Infrastructure',
        description:
            'Manages the technical backbone that keeps our projects running.',
        image: '/resources/team/owen_profile.png',
        background: '/resources/team/profile_bg.png'
    },
    {
        name: 'Redned',
        role: 'Advisor',
        description:
            '',
        image: '/resources/team/redned_profile.png',
        background: '/resources/team/redned_profile_bg.png'
    },
    {
        name: 'Luke',
        role: 'Advisor',
        description:
            '',
        image: '/resources/team/luke_profile.png',
        background: '/resources/upbg3.png'
    }
];

export function findTeamMember(name: string): TeamMember | undefined {
    return teamMembers.find((member) => member.name.toLowerCase() === name.toLowerCase());
}
