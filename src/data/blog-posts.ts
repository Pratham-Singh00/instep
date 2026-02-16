
export interface BlogPost {
    id: number;
    title: string;
    excerpt: string;
    content: string;
    author: string;
    date: string;
    categories: string[];
    tags: string[];
    featured_image: string;
    slug: string;
    link?: string;
    readingTime?: string;
    views?: number;
}

export const localBlogPosts: BlogPost[] = [
    {
        id: 1,
        title: "Slow Down - You Move Too Fast: unexpected Joys of Unplanned Time",
        excerpt: "Why hitting the pause button on summer scheduling can lead to better connection and creativity for your kids.",
        content: `
      <p>It happens every year around this time. The panic sets in. The transition from the academic year to the summer year. Parents frantically calling to find out which camps are still open, which lessons are available, how they can fill the hours of their children's days. The pressure to keep them busy, to keep them learning, to keep them... moving.</p>
      
      <p>I want to offer a radical suggestion: <strong>Hit the pause button.</strong></p>
      
      <p>In our fast-paced, high-achievement culture, we often equate "doing nothing" with laziness or wasted potential. But for children (and adults!), unplanned time is where the magic happens. It's where creativity is born, where decompression occurs, and where the simple joys of childhood are found.</p>
      
      <h3>The Art of Doing Nothing</h3>
      <p>Remember when summer meant eating watermelon on the porch? Running through a sprinkler? Reading a book under a tree? These aren't just nostalgic memories; they are essential experiences for nervous system regulation.</p>
      
      <p>Instead of over-scheduling this summer, consider these low-stress alternatives:</p>
      <ul>
        <li><strong>Delicious Books:</strong> Let them pick what they want to read. No book reports, no levels. Just reading for pleasure.</li>
        <li><strong>Family Game Night:</strong> Dust off the board games. It teaches turn-taking, frustration tolerance (we're looking at you, Monopoly), and bonding.</li>
        <li><strong>Tech-Free Surprises:</strong> A box of art supplies, a magnifying glass for the backyard, a new puzzle.</li>
      </ul>
      
      <p>Slow down. You might just find that by doing "less," you're giving your family so much more.</p>
    `,
        author: "In Step Team",
        date: "2024-06-01",
        categories: ["Parenting", "Wellness"],
        tags: ["summer", "stress reduction", "family time"],
        featured_image: "/assets/images/blog/summer-slowdown.jpg",
        slug: "slow-down-you-move-too-fast",
        readingTime: "3 min read",
        views: 120
    },
    {
        id: 2,
        title: "Watch Out For Creepers: Minecraft & Emotional Regulation",
        excerpt: "How we use popular video games like Minecraft to teach children about anger management and anxiety.",
        content: `
      <p>If you have a child between the ages of 6 and 16, chances are you've heard of Minecraft. You know about the Creepers, the Zombies, the crafting, and the endless building. But did you know Minecraft can be a powerful tool for therapy?</p>
      
      <p>Erica Craig, LCSW, RDT, has pioneered the use of <strong>Minecraft Social Development Groups</strong> at In Step. The concept is simple but profound: use the language children already speak to teach them concepts they struggle to understand.</p>
      
      <h3>The Metaphor of the Mob</h3>
      <p>In the game, "hostile mobs" like Creepers (who explode when they get close) or Skeletons (who shoot arrows from afar) make excellent metaphors for real-life emotions.</p>
      
      <ul>
        <li><strong>The Creeper:</strong> Represents sudden, explosive anger. We work with kids to identify their "fuse." What lights it? How can we defuse it before the explosion?</li>
        <li><strong>The Shelter:</strong> In the game, you build a shelter to stay safe at night. In therapy, we build "emotional shelters"—coping strategies and safe spaces where we can go when we feel overwhelmed.</li>
      </ul>
      
      <p>This "spoonful of sugar" approach removes the stigma often associated with therapy. Kids aren't "working on their anger issues"; they are "learning to survive the night." By solving problems in the game within a structured group of peers, they are practicing social skills in real-time.</p>
      
      <p>It’s not just a game; it’s a bridge to emotional intelligence.</p>
    `,
        author: "Erica Craig, LCSW, RDT",
        date: "2024-05-15",
        categories: ["Child Therapy", "Social Skills"],
        tags: ["minecraft", "emotional regulation", "play therapy"],
        featured_image: "/assets/images/blog/minecraft-therapy.jpg",
        slug: "watch-out-for-creepers",
        readingTime: "4 min read",
        views: 350
    },
    {
        id: 3,
        title: "Understanding DBT: A Guide for Parents",
        excerpt: "What is Dialectical Behavior Therapy, and is it right for your teen?",
        content: `
      <p>Dialectical Behavior Therapy (DBT) is one of the most effective treatments for teens and adults who struggle with intense emotions. But the name itself can be confusing. What does "dialectical" mean?</p>
      
      <p><strong>Dialectic</strong> means holding two opposing truths at the same time. In DBT, the core dialectic is: <em>Acceptance vs. Change.</em></p>
      
      <p>We accept you exactly as you are (you are doing the best you can), AND we know you need to change (you need to do better, try harder, and replace dysfuntional behaviors).</p>
      
      <h3>The Four Modules of DBT</h3>
      <p>Our DBT Skills Groups cover four critical areas:</p>
      <ol>
        <li><strong>Mindfulness:</strong> Being present in the moment without judgment.</li>
        <li><strong>Distress Tolerance:</strong> Surviving crisis situations without making them worse.</li>
        <li><strong>Emotion Regulation:</strong> Understanding and naming emotions, and reducing vulnerability to negative ones.</li>
        <li><strong>Interpersonal Effectiveness:</strong> Asking for what you want (or saying no) while maintaining self-respect and relationships.</li>
      </ol>
      
      <p>If your teen is struggling with mood swings, self-harm, or impulsive behavior, DBT might be the roadmap they need.</p>
    `,
        author: "In Step Clinical Team",
        date: "2024-04-10",
        categories: ["DBT", "Teen Therapy"],
        tags: ["dbt", "mental health", "teens"],
        featured_image: "/assets/images/blog/dbt-guide.jpg",
        slug: "understanding-dbt-guide",
        readingTime: "5 min read",
        views: 412
    }
];
