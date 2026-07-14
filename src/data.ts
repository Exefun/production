import { GameScore } from './types';

export interface ScienceArticle {
  id: string;
  title: string;
  category: 'Inhibitory Control' | 'Working Memory' | 'Cognitive Flexibility' | 'ADHD & Executive Function';
  summary: string;
  content: string;
  citation: string;
  readTime: string;
}

export interface SchoolPricingTier {
  id: string;
  name: string;
  maxStudents: string;
  pricePerYear: number;
  features: string[];
}

export const SCIENCE_ARTICLES: ScienceArticle[] = [
  {
    id: '1',
    title: 'Understanding Inhibitory Control: The Brain\'s Braking System',
    category: 'Inhibitory Control',
    summary: 'How the prefrontal cortex suppresses automatic responses to allow goal-directed, thoughtful choices.',
    content: 'Inhibitory control is the cognitive process that permits individuals to inhibit their impulses and natural, habitual, or dominant responses to select a more appropriate behavior in line with their goals. This is the foundation of self-control, focus, and emotional regulation. In games like the Stroop Test, this "braking system" is put to work by forcing the brain to suppress the automatic impulse of reading the word itself and instead name the visual color of the text. Studies show that structured training of inhibitory control can improve attention span in ADHD children by up to 28%.',
    citation: 'Diamond, A. (2013). Executive functions. Annual Review of Psychology, 64, 135-168.',
    readTime: '4 min read'
  },
  {
    id: '2',
    title: 'N-Back Training and the Plasticity of Working Memory',
    category: 'Working Memory',
    summary: 'Exploring how active recall and sequence-tracking enhance temporary information processing.',
    content: 'Working memory is the cognitive system responsible for temporarily holding and manipulating information. Unlike long-term memory, working memory has a limited capacity and is crucial for reasoning, language comprehension, and problem-solving. The N-Back task is the gold standard for testing and training working memory. It requires the participant to monitor a sequence of stimuli and decide if the current stimulus matches the one presented "N" steps ago. Functional MRI scans demonstrate that regular N-Back practice increases synaptic density and blood flow in the dorsolateral prefrontal cortex (DLPFC).',
    citation: 'Jaeggi, S. M., et al. (2008). Improving fluid intelligence with training on working memory. PNAS.',
    readTime: '6 min read'
  },
  {
    id: '3',
    title: 'Cognitive Flexibility: Shifting Rules in a Dynamic World',
    category: 'Cognitive Flexibility',
    summary: 'The ability to switch perspectives, adapt to new rules, and recover from unexpected changes.',
    content: 'Cognitive flexibility represents our mental ability to switch between two different concepts, or to think about multiple concepts simultaneously. It allows us to adapt to change and adjust to unexpected obstacles. Executive Function training often targets this by forcing rapid rule switches (e.g., matching shapes by color, then suddenly switching to matching them by number). Without cognitive flexibility, we become rigid and repeat errors. Children with autism or learning difficulties often struggle with transition and benefit heavily from gamified shifting activities.',
    citation: 'Monsell, S. (2003). Task switching. Trends in Cognitive Sciences, 7(3), 134-140.',
    readTime: '5 min read'
  },
  {
    id: '4',
    title: 'Gamification as a Therapeutic Tool for ADHD & Executive Dysfunction',
    category: 'ADHD & Executive Function',
    summary: 'How responsive feedback loops and dopamine-aligned rewards increase engagement and drive neuroplasticity.',
    content: 'Traditional cognitive training can be repetitive and boring, leading to high dropout rates, especially among individuals with ADHD. Gamification solves this by introducing immediate, positive feedback loops, visual achievements, and adaptive difficulty levels. This alignment stimulates natural dopamine release, keeping players engaged. Recent clinical trials demonstrate that digital therapeutics targeting executive function can significantly reduce ADHD symptoms, in some cases reducing the need for stimulant medication or enhancing its therapeutic effect.',
    citation: 'Kollins, S. H., et al. (2020). A novel digital intervention for ADHD: a randomized controlled trial. The Lancet Digital Health.',
    readTime: '7 min read'
  }
];

export const SCHOOL_PRICING_TIERS: SchoolPricingTier[] = [
  {
    id: 'classroom',
    name: 'Classroom Bundle',
    maxStudents: 'Up to 35 Students',
    pricePerYear: 299,
    features: [
      'Individual student progress trackers',
      'Teacher dashboard with custom assignment builder',
      '3 core cognitive games with adaptive difficulty',
      'Downloadable PDF cognitive worksheets',
      'Email support'
    ]
  },
  {
    id: 'school',
    name: 'School-Wide License',
    maxStudents: 'Up to 500 Students',
    pricePerYear: 1499,
    features: [
      'Everything in Classroom Bundle',
      'District-aligned rosters (Clever/ClassLink integration)',
      'School administrator analytics dashboard',
      'Unlimited teacher accounts',
      'Custom professional development training video',
      'Priority 24/7 support'
    ]
  },
  {
    id: 'district',
    name: 'District Enterprise',
    maxStudents: 'Unlimited Students',
    pricePerYear: 3499,
    features: [
      'Everything in School-Wide License',
      'Multi-school dashboard with administrative audits',
      'White-labeled portal with customized school branding',
      'Dedicated Customer Success Manager',
      'Live onboarding and teacher PD workshops',
      'Customized reporting for IEP and SPED meetings'
    ]
  }
];

export const INITIAL_SCORES_HISTORY: GameScore[] = [
  { gameId: 'stroop', gameName: 'Ant Escape', score: 450, accuracy: 82, reactionTime: 920, date: '2026-06-25' },
  { gameId: 'nback', gameName: 'Jigsaw 9', score: 320, accuracy: 70, reactionTime: 1150, date: '2026-06-26' },
  { gameId: 'ruleswitch', gameName: 'Color Rush', score: 510, accuracy: 88, reactionTime: 780, date: '2026-06-27' },
  { gameId: 'stroop', gameName: 'Ant Escape', score: 580, accuracy: 90, reactionTime: 810, date: '2026-06-28' },
  { gameId: 'nback', gameName: 'Jigsaw 9', score: 450, accuracy: 78, reactionTime: 980, date: '2026-06-29' },
  { gameId: 'ruleswitch', gameName: 'Color Rush', score: 620, accuracy: 92, reactionTime: 690, date: '2026-06-30' },
  { gameId: 'stroop', gameName: 'Ant Escape', score: 710, accuracy: 96, reactionTime: 640, date: '2026-07-01' },
  { gameId: 'nback', gameName: 'Jigsaw 9', score: 590, accuracy: 85, reactionTime: 820, date: '2026-07-02' },
  { gameId: 'ruleswitch', gameName: 'Color Rush', score: 740, accuracy: 95, reactionTime: 580, date: '2026-07-03' }
];
