interface TeamMember {
    name: string;
    role: string;
    description: string;
    image: string;
    hasImage: boolean;
    background?: string;

}

export const teamMembers: TeamMember[] = [
    {
        name: 'Chris',
        role: 'Project Lead',
        description:
            "Hey! I\'m Chris! Currently leading Open Collaboration, maintaining Geyser, and studying. Probably on a train " +
            "while you're reading this :)",
        image: '/resources/team/chris_profile.jpg',
        background: '/resources/team/profile_bg.png',
        hasImage: false
    },
    {
        name: 'Owen',
        role: 'Infrastructure',
        description:
            'Manages the technical backbone that keeps our projects running.',
        image: '/resources/team/owen_profile.png',
        background: '/resources/team/profile_bg.png',
        hasImage: false
    },
    {
        name: 'Redned',
        role: '',
        description:
            '',
        image: '/resources/team/redned_profile.png',
        background: '/resources/team/profile_bg.png',
        hasImage: false
    },
    {
        name: 'Lukeeey',
        role: '',
        description:
            '',
        image: '/resources/team/owen_profile.png',
        background: '/resources/team/profile_bg.png',
        hasImage: false
    },
    {
        name: 'Zed',
        role: '',
        description:
            '',
        image: '/resources/team/owen_profile.png',
        background: '/resources/team/profile_bg.png',
        hasImage: false
    }
];