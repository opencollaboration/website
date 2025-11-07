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
            'Leads the Open Collaboration Project to handle day-to-day operations.',
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
    }
];