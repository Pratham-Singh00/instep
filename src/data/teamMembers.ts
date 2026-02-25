import cathieCohenImg from "@/assets/CathieCohen.jpg";
import christinaMarconeImg from "@/assets/ChristinaMarcone.jpg";
import daleSorgImg from "@/assets/DaleSorg.jpg";
import doveCohenImg from "@/assets/DoveCohen.jpg";
import ericaCraigMannImg from "@/assets/EricaCraig-Mann.jpg";
import erikaCarlsonImg from "@/assets/ErikaCarlson.jpg";
import jamesSebbenImg from "@/assets/JamesSebben.jpg";
import jenniferCaseImg from "@/assets/JenniferCase.jpg";
import keithEwellImg from "@/assets/KeithEwell.jpg";
import kellyMurphyImg from "@/assets/KellyMurphy.jpg";
import kimberlyGrimesImg from "@/assets/KimberlyGrimes.jpg";
import maryShuffletonImg from "@/assets/MaryShuffleton.jpg";
import rachelCherianImg from "@/assets/RachelCherian.jpg";
import salimaJiwaImg from "@/assets/SalimaJiwa.jpg";
import zaraAhmadImg from "@/assets/ZaraAhmad.jpg";
import monicaManaotlImg from "@/assets/Monica Manaotl Picture.JPG?url";
import mayaDiasImg from "@/assets/Maya Dias Headshot.jpg?url";
import ingaMencyImg from "@/assets/Inga Mency Headshot.jpg?url";

export interface TeamMember {
  id: string;
  name: string;
  qualification: string;
  image: string;
  bio: string;
  email: string;
  imagePosition?: string;
}

export const teamMembers: TeamMember[] = [
  {
    id: "cathie-cohen",
    name: "Cathi Cohen",
    qualification: "LCSW, CGP, Clinical Director",
    image: cathieCohenImg,
    bio: "In Step’s Founder and Clinical Director, Cathi Cohen, is a Licensed Clinical Social Worker (LCSW) and Certified Group Psychotherapist (CGP). She has worked with children, adolescents, and adults in a clinical setting since 1984. Early in her career, Cathi recognized the enormous emotional power of group therapy. It was this passion and expertise that led to the formation of In Step in 1995. In Step is a comprehensive mental health practice specializing in group treatment.\n\nCathi enjoys treating kids, teens, and adults in various modalities, including individual, family, parent coaching, and couples therapy. She also relishes leading ongoing interpersonal psychotherapy groups with teens and adults as well as parent coaching groups.\n\nThe Stepping Stones Social IQ program Cathi created is an evidence-based social skills group therapy program that has benefited thousands of kids and their parents since its inception in 1990. Cathi continues to train, supervise, and certify In Step’s Social IQ specialists to deliver the highly successful group therapy model for kids and their parents.\n\nIn addition to being interviewed on radio, television, and social media sites, Cathi conducts regular workshops for parents, educators, and mental health professionals on a national and international level. Cathi is the author of several books: Raise Your Child’s Social IQ: Stepping Stones to People Skills for Kids, Raise Your Parenting IQ – Moving From I’ve Had It to I’ve Got This!, Outnumbered, Not Outsmarted: An A – Z Guide for Working with Kids and Teens in Groups, and Stepping Stones to Building Friendships: A Guide for Camp Counselors.\n\nCathi graduated from Tufts University before receiving her M.S. degree from Columbia University.\n\nIn her spare time, Cathi loves dancing, improv, singing (in the car with her daughter), listening to music, hiking, attending film festivals, theatre – Broadway especially, and traveling anywhere and everywhere with her family and friends.",
    email: "admin@insteppc.com",
    imagePosition: "object-top"
  },
  {
    id: "dale-sorg",
    name: "Dale Sorg",
    qualification: "M.A., Ed.S",
    image: daleSorgImg,
    bio: "As a Licensed School Psychologist, Dale is passionate about promoting age-appropriate growth and development and supporting families during the critical early years of childhood. In addition to working one-on-one with children to address anxiety and other mental health issues using Play Therapy, Cognitive Behavioral Therapy (CBT), Mindfulness, and Self-Regulation methods.\n\nDale enjoys leading various groups at In Step: Lego-based Social Development Groups, Early Childhood Social Skills Group, Stepping Stones Social IQ groups, Girls Social Confidence Groups, Animal Crossing Social Development Group, and Middle School Interpersonal Skills Groups. Her career in the public school system has led to an expertise in conducting psycho-educational assessments and offering consultation to parents and school staff.\n\nDale earned her Bachelor’s Degree in Psychology at the University of Richmond and her Master’s and Educational Specialist Degree in School Psychology at James Madison University.\n\nDuring her free-time, Dale instructs youth and master level swimmers, cooks, runs, and spends time with her loved ones.",
    email: "admin@insteppc.com",
    imagePosition: "object-top"
  },
  {
    id: "erika-carlson",
    name: "Erika Carlson",
    qualification: "LCSW",
    image: erikaCarlsonImg,
    bio: "Erika is a Licensed Clinical Social Worker who offers treatment and support to adolescents and adults who present with various mental health issues, including depression, anxiety, personality disorders, and those who struggle with emotion regulation and tolerating discomfort. Erika believes “all clients want to lead a happier life but may not always know how to achieve a life worth living.” Erika and her clients “address behaviors that interfere with goals,” and together, they “create effective ways to address them.” Erika creates a therapeutic environment that is both validating and compassionate, both of which are necessary to promote acceptance and positive change. In many cases, Erika’s clients have a history of unsuccessful treatments elsewhere and often present with a history of prior hospitalizations. Her clients struggle with self-harming behaviors, substance use, and/or suicidal ideation. Erika also supports couples and families seeking a more balanced family dynamic. Erika finds that Dialectical Behavior Therapy (DBT) has been most effective at providing her clients an opportunity for positive change while simultaneously providing them with a life worth living. She provides individual and group treatment with a DBT skill development focus.\n\nErika received her Bachelor’s degree in Psychology from Virginia Tech and her Master’s in Social Work from Virginia Commonwealth University.\n\nIn addition to her time at In Step, Erika enjoys spending time in the great outdoors with her husband and three children. She is also an avid triathlons/ironman competitor.",
    email: "admin@insteppc.com",
    imagePosition: "object-top"
  },
  {
    id: "christina-marcone",
    name: "Christina Marcone",
    qualification: "LCSW",
    image: christinaMarconeImg,
    bio: "Christina Marcone is a Licensed Clinical Social Worker (LCSW) whose therapeutic approach is grounded in empathy, understanding, and a strong commitment to helping clients reach their highest potential.  She was a school social worker for Fairfax County Public Schools (FCPS) and has worked with a variety of populations, including individuals in crisis, adults with major mental illness, children and teens who have experienced significant trauma, LGBTQ+ youth, and individuals on the autism spectrum.\n\nChristina is trained in Dialectical Behavior Therapy (DBT) and utilizes a trauma-informed approach, allowing her to effectively support clients with diverse needs. She is passionate about empowering individuals to navigate their challenges, build resilience, and lead fulfilling lives.\n\nChristina has a bachelor’s degree in social work from Radford University and a master’s degree in social work from George Mason University.\n\nIn her free time, Christina enjoys traveling, being in nature, dancing, practicing photography, and spending quality time with her people.",
    email: "admin@insteppc.com"
  },
  {
    id: "james-sebben",
    name: "Jim Sebben",
    qualification: "EdD, LPC, LMFT",
    image: jamesSebbenImg,
    bio: "Jim Sebben is a Licensed Professional Counselor and a Licensed Marriage and Family Therapist. He has been in private practice since 1986 and joined In Step in 1995. Jim’s goal is “to collaborate with clients to help them define their values, examine their emotions and set attainable goals that enrich their lives from both a social and emotional perspective. My work is rooted in my respect for my clients and my desire to help them reach their potential. I believe it often ‘takes a village’ to provide them with all the services they need to function as successful adults.” Jim currently enjoys working with adolescents, young adults, couples, and families. He has extensive experience working with clients diagnosed with ADHD and clients recovering from drug and alcohol addiction. He uses various treatment strategies depending on the needs of the client and coordinates clinical services with other professionals and schools. Jim is retired from Fairfax County Public Schools, where he worked as a Special Education Principal in both elementary and high schools for students identified as emotionally disturbed. He has been an Adjunct Faculty Member at George Mason University, University of Virginia, and Marymount University. \n\nJim Sebben earned his doctoral degree in Counselor Education at Boston University.\n\nWhen not working at In Step, Jim can be found enjoying the company of his wife, children, and especially grandchildren. He also swims with the L4 Master’s Swim Team, enjoys the theater, cheers for the Washington Nationals, reads, and travels. He does volunteer work at the Smithsonian Institution and gardens from Spring through Fall.",
    email: "admin@insteppc.com",
    imagePosition: "object-top"
  },
  {
    id: "kimberly-grimes",
    name: "Kimberley Grimes",
    qualification: "LCSW",
    image: kimberlyGrimesImg,
    bio: "Kimberley Grimes is a Licensed Clinical Social Worker specializing in individual, family, and group therapy for children, adolescents, and their families. She believes in the inherent strength of families and their capacity for growth, resilience, and healing. Kim helps clients develop effective coping skills, strengthen emotional and behavioral resilience, and build healthier, more connected relationships.<br><br>Kim earned her bachelor's degree in Child and Family Development from Virginia Tech and holds two master's degrees from the University of Illinois at Urbana-Champaign in Social Work and Human and Community Development. Her experience spans foster care, medical settings, outpatient mental health clinics, and in-home therapy, giving her a well-rounded understanding of the challenges families face.<br><br>At In Step, Kim provides individual therapy for teens and adults, parenting support, and structured parent coaching. She also leads therapeutic social skills groups, including Stepping Stones Social IQ Development Groups, Parenting Groups, and Teen Interpersonal Groups—focused on emotional regulation, peer connection, and interpersonal effectiveness.<br><br>Kim also offers S.P.A.C.E. (Supportive Parenting for Anxious Childhood Emotions), an evidence-based, parent-based treatment developed by Dr. Eli Lebowitz to help families reduce accommodation and respond more effectively to a child's, teen's, or young adult's anxiety or OCD, including ARFID and challenges related to failure to launch. S.P.A.C.E. works directly with parents to reduce accommodation of anxiety, strengthen caregiver responses, and support lasting change across the family system. Parents gain practical, concrete strategies to build resilience and create a calmer, more confident home environment. This service is available in both individual and group formats. Watch Dr. Lebowitz's TEDx Talk to learn more: <a href=\"https://www.ted.com/talks/dr_eli_lebowitz_rethinking_treatment_for_child_anxiety_and_ocd\" target=\"_blank\">https://www.ted.com/talks/dr_eli_lebowitz_rethinking_treatment_for_child_anxiety_and_ocd</a><br><br>Kim partners closely with individuals and families to create personalized, strengths-based treatment plans that align with their values and support lasting change. Contact Kim to learn more about how she can support you and your family.",
    email: "admin@insteppc.com"
  },
  {
    id: "dove-cohen",
    name: "Dov Cohen",
    qualification: "MSW, Supervisee in Social Work",
    image: doveCohenImg,
    bio: "Meet Dov, a compassionate male psychotherapist with a knack for connecting with kids, teens, young adults, and parents. With a heart as warm as his approach, Dov thrives in both individual and group settings, creating safe spaces where his clients grow and connect. His passion for guiding them through life’s challenges makes him a trusted ally in the journey of self-discovery and growth.\nDov is especially excited about his Dungeon and Dragons program. He developed this unique group program to meet the needs of teens and young adults who struggle socially. DND offers its members a way to have fun while developing social confidence and making vital connections with others.\nDov received his BA in psychology from The College of Wooster in Ohio and his MSW from The University of Maryland-Baltimore.\nDov is a Virtual Only therapist. All of his groups and one-on-one client sessions occur online.",
    email: "admin@insteppc.com"
  },
  {
    id: "kelly-murphy",
    name: "Kelly Murphy",
    qualification: "LPC",
    image: kellyMurphyImg,
    bio: "Kelly is a Licensed Professional Counselor who provides a wide range of services to teens, families, and children in a variety of settings. Kelly’s particular area of interest and expertise is treating children and teens with issues such as behavioral challenges, anxiety, self-esteem struggles, self-injurious behaviors, communicating and adjusting within a changing and/or blended family, and social difficulties in both group and individual settings. At In Step, Kelly leads Stepping Stones Social IQ groups for kids and Stepping Stones graduate groups as well as groups for kids who suffer from anxiety. Kelly earned her MA in Education and Human Development from George Washington University. Kelly continues to work during the day as a school counselor for Fairfax County Public Schools.",
    email: "admin@insteppc.com",
    imagePosition: "object-top"
  },
  {
    id: "salima-jiwa",
    name: "Salima Jiwa",
    qualification: "LCSW",
    image: salimaJiwaImg,
    bio: "Salima is a Licensed Clinical Social Worker who is passionate about coaching clients to utilize their own well-being and innate wisdom in resolving their struggles. As part of Salima’s ongoing clinical training, she participated in and earned her certificate from the Supercoach Academy, an international transformational coaching program that provides training in the three principles of mind, consciousness, and thought. Salima is eager to share this understanding with clients who want to access their innate mental health, clarity, and wisdom. Salima earned her master’s in social work degree from Virginia Commonwealth University and a post-masters certificate in Marriage and Family Therapy (MFT) from the Argyle Institute of Human Relations in Montreal, Québec. At In Step, she works individually and in groups with children, adolescents, and parents and co-facilitates the parent DBT Skills Training program. In addition to working at In Step, Salima is a school social worker with Fairfax County Public Schools. In her spare time, Salima loves working with her hands building things and traveling.",
    email: "admin@insteppc.com",
    imagePosition: "object-top"
  },
  {
    id: "rachel-cherian",
    name: "Rachel Cherian",
    qualification: "LCSW",
    image: rachelCherianImg,
    bio: "Rachel is a Licensed Clinical Social worker with over 20 years of clinical experience. Rachel strongly believes “each person does the best they can in a given moment.”  This leads her to compassionately work “as an ally with her clients in helping them to create a life worth living.” Growing up as an Indian-American gives Rachel the unique ability to understand the perspective of both teens and parents in the process of acculturation. Rachel specializes in DBT (Dialectical Behavioral Therapy) informed work. She very much enjoys working with teens and young adults who struggle with depression, anxiety, and interpersonal relationships.\n\nPrior to her career as a psychotherapist, Rachel worked as a preschool teacher for eight years. She is also a school social worker with Fairfax County Public Schools.  Rachel earned her M.S. Degree in social work from Columbia University in New York. When Rachel is not working, she enjoys spending time with her husband and daughter, reading, and watching classic Bollywood films.",
    email: "admin@insteppc.com",
    imagePosition: "object-top"
  },
  {
    id: "keith-ewell",
    name: "Keith K. Ewell",
    qualification: "Ph.D.",
    image: keithEwellImg,
    bio: "Keith is a Licensed Clinical Psychologist and has been with In Step for over 20 years. He has a passion for working with teenagers who are struggling with anxiety disorders, depression, and ADHD, as well as those who suffer from acute and chronic medical conditions. In addition to working with kids and teens one-on-one, Keith offers parent coaching services. At In Step, he was one of the first clinicians fully certified as a Stepping Stones Social IQ leader and, as such, leads both parent and child social skills training groups. Keith is the founder of Harmony Information Systems, which provides technical support for human service agencies. He received his Ph.D. in Psychology from the University of Miami in Florida. Keith does not have much in the way of spare time, but when he does, he enjoys working out, listening to music, reading noir fiction and history, in particular, and occasionally singing and playing guitar (sort of) with a garage band. Also, he loves to travel and only has two states (Idaho and Nebraska) left that he hasn’t visited.",
    email: "admin@insteppc.com",
    imagePosition: "object-top"
  },
  {
    id: "erica-craig-mann",
    name: "Erica Craig-Mann",
    qualification: "Ph.D., LCSW, RDT-BCT",
    image: ericaCraigMannImg,
    bio: "Erica Craig-Mann is a Licensed Clinical Social Worker (LCSW), drama therapist (RDT) and drama therapy educator (BCT) who uses talk therapy, creative expression, and embodied techniques to help people navigate life’s messy challenges.\n\nErica works individually with adults and leads groups for adults, teens, and children. She especially enjoys working with parents, young adults, and folks navigating life transitions. She also offers parent coaching, supporting parents in understanding and responding to their kids’ behavior, fostering connection, and establishing healthy rhythms in the home. Most clients come to Erica hoping to decrease symptoms of anxiety or depression, overcome obstacles related to life transitions, or improve the quality of their relationships. Erica is an LGBTQ+ affirming therapist.\n\nErica also offers clinical supervision to social workers and drama therapists, as well as drama therapy training. When she isn’t doing clinical work, Erica teaches at Emory University and Antioch University, and is currently pursuing her PhD in counseling education and supervision through Antioch University. She also enjoys dancing and spending time with her kids and spouse.\n\nErica is a Virtual Only therapist. All of her groups and one-on-one client sessions occur online.",
    email: "admin@insteppc.com"
  },
  {
    id: "zara-ahmad",
    name: "Zara Ahmad",
    qualification: "M.A., NCSP",
    image: zaraAhmadImg,
    bio: "Zara’s compassion and heart shines through as she guides teens and kids through life’s challenges. With a gift for connecting with children and teens on a personal level, Zara creates a safe space for her clients to grow and change. As a Nationally Certified School Psychologist with a wide range of experience, Zara is able to meet children, teens, and parents where they are so they feel heard and understood. She especially enjoys working with folks on the spectrum. In addition to offering counseling services, Zara is a seasoned Loudoun County school psychologist where she provides psychological assessments to students, on-going consultation with teachers/families, and support in determining and implementing special education eligibility, 504, IEP plans, and crisis response interventions.\n\nZara earned her bachelor’s degree in Psychology and master’s degree in School Psychology from George Mason University. She also obtained her Certificate of Advanced Graduate Study from George Mason University.",
    email: "admin@insteppc.com"
  },
  {
    id: "jennifer-case",
    name: "Jennifer Case",
    qualification: "Ph.D., LPC",
    image: jenniferCaseImg,
    bio: "Jennifer works with clients throughout the lifespan to promote a deeper understanding of self to heal past wounds and reduce problematic behaviors. Her theoretical background is deeply rooted in Internal Family Systems (IFS) and she has completed Level 1 training through the Internal Family Systems Institute. With this framework, she will also incorporate play therapy, person-centered therapy, and cognitive behavioral therapy (CBT) techniques when appropriate. Just as varied are her clients’ ages, so are their reasons for seeking services. Jennifer works extensively with (but is not limited to) clients experiencing anxiety, depression, challenges with social skills, and difficulties with life transitions. This includes working with children and adults with ADHD and Autism. She is a staunch believer in a non-pathologizing view of neurodiversity. With this, she often also works with parents of neurodiverse children to promote understanding and harmony in the household.\n\nHer educational background includes a BS in Psychology from Virginia Commonwealth University, an MA in Psychology from Pace University, a PhD in Educational Psychology from The Graduate Center of City University of New York, and an MS in Clinical Mental Health Counseling from Walden University. Jennifer has been with In Step since March 2015 beginning in administration and management before moving into a clinical role as her education progressed.\n\nWhen not at In Step, Jennifer can be found playing with her own child and pets.",
    email: "admin@insteppc.com",
    imagePosition: "object-top"
  },
  {
    id: "mary-shuffleton",
    name: "Mary Shuffleton",
    qualification: "LPC, CGP",
    image: maryShuffletonImg,
    bio: "Mary Shuffleton is a Licensed Professional Counselor and a Certified Group Psychotherapist. Mary helps her clients “reduce the impact of stress on their lives, view themselves more clearly and accurately, and address destructive patterns of behavior that are obstacles to happiness.” Mary believes strongly “in a collaborative treatment team approach especially when working with kids and teens where parents are a critical part of the therapeutic process.” Using a combination of approaches – DBT (dialectical behavioral therapy), CBT (cognitive behavioral therapy), Parenting IQ coaching, Relational Psychotherapy, and Psychodynamic Psychotherapy – Mary provides therapy to kids, teens, and adults who struggle with a variety of mental health issues including depression, anxiety, and emotional dysregulation. She especially loves working with people in groups as she believes “groups provide a highly effective environment for skill-building, personal growth, and healing.” Mary has additional training in play therapy and utilizes this type of therapy for young children. In her free time, Mary loves reading, yoga, hiking, and traveling with family and friends. She received her Master’s in Counseling Psychology at Gonzaga University in Spokane, Washington.",
    email: "admin@insteppc.com",
    imagePosition: "object-top"
  },
  {
    id: "monica-manaotl",
    name: "Monica Manaotl",
    qualification: "Office Manager",
    image: monicaManaotlImg,
    bio: "",
    email: "admin@insteppc.com",
    imagePosition: "object-top"
  },
  {
    id: "maya-dias",
    name: "Maya Dias",
    qualification: "Business Manager",
    image: mayaDiasImg,
    bio: "",
    email: "admin@insteppc.com",
    imagePosition: "object-top"
  },
  {
    id: "inga-mency",
    name: "Inga Mency",
    qualification: "Practice Manager (on leave)",
    image: ingaMencyImg,
    bio: "",
    email: "admin@insteppc.com",
    imagePosition: "object-top"
  },
];
