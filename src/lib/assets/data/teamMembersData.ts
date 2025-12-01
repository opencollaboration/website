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
            "I\'m Chris! Currently leading Open Collaboration, maintaining Geyser, and studying. Passionate about OSS " +
            "and coding in Java.",
        image: '/resources/team/chris_profile.jpg',
        background: '/resources/team/chris_profile_bg.png',
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
        name: 'Luke',
        role: '',
        description:
            '',
        image: '/resources/team/luke_profile.png',
        background: '/resources/upbg3.png',
        hasImage: false
    },
    {
        name: 'Zed',
        role: 'Managing Director, Ziax',
        description:
            '',
        image: '/resources/team/zed_profile.png',
        background: '/resources/team/zed_profile_bg.png',
        hasImage: false
    }
];