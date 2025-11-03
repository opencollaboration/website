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
            'Leads the Open Collaboration Project with a focus on community-driven development and ensuring the success of all adopted open-source projects.',
        image: '/resources/team/chris_profile.jpg',
        background: '/resources/team/profile_bg.png',
        hasImage: false
    },
    {
        name: 'Owen',
        role: 'Infrastructure',
        description:
            'Focuses on handling the core infrastructure and ensuring smooth operation of all supported projects. Manages the technical backbone that keeps our ecosystem running.',
        image: '/resources/team/owen_profile.png',
        background: '/resources/team/profile_bg.png',
        hasImage: false
    }
];