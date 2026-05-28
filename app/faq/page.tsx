'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';

const FAQ_SECTIONS = [
  {
    title: 'General',
    items: [
      ['What is ClimateOS 2026?', 'ClimateOS 2026 is a global, online climate-tech hackathon designed to help teams build deployable, open-source solutions for urgent climate challenges.'],
      ['Who can participate?', 'ClimateOS is open to all. We welcome students, early-career builders, professionals, researchers, designers, and interdisciplinary teams from anywhere in the world.'],
      ['Is this hackathon fully online?', 'Yes. ClimateOS is built natively for online participation, with async-first collaboration and optional live moments for announcements, mentor interactions, and finals.'],
      ['How long is the event?', 'The main build sprint runs for 48 hours. Pre-hack preparation, async judging, and the finals happen around it as part of the wider event flow.'],
      ['What does "coming soon" mean right now?', 'It means the event website is still being prepared. We are finalising the full public launch content, including applications, FAQs, and track explainers.'],
    ],
  },
  {
    title: 'Tracks and Themes',
    items: [
      ['How many tracks will there be?', 'There will be 5 climate-focused tracks, each with a specific problem domain, dataset package, mentor support, and prize focus.'],
      ['Can I choose my track?', 'Yes. Participants will be able to apply to a track that matches their interests and skills.'],
      ['Will there be an open track?', 'Yes. Teams may also propose an original climate problem outside the five core tracks, but they will need to justify why the problem matters with evidence.'],
      ['Are the tracks only for technical projects?', 'No. While teams will build with code, ClimateOS welcomes product thinkers, designers, researchers, and domain specialists as long as the final output is a working, documented solution.'],
    ],
  },
  {
    title: 'Format and Participation',
    items: [
      ['How does the online format work?', 'The event is designed around a virtual campus, Discord community channels, mentor booking, and async judging. Participants do not need to attend every live moment to compete effectively.'],
      ['Will there be live sessions?', 'Yes, but live sessions are optional except for the finals. This makes the event accessible across time zones and schedules.'],
      ['Can solo participants join?', 'Yes. Solo submissions are allowed, though team-based building is encouraged.'],
      ['What is the team size?', 'Teams are expected to have 2-4 members.'],
      ['Can I join if I do not already have a team?', 'Yes. A team-matching process will be provided before the sprint so solo applicants can form teams.'],
    ],
  },
  {
    title: 'Registration and Applications',
    items: [
      ['When will applications open?', 'Applications will open closer to launch. The website will announce the exact date.'],
      ['How will registration work?', 'Registration will be handled through the event platform, with a short application form and follow-up email confirmation.'],
      ['Will everyone who applies be accepted?', 'Not necessarily. The organising team may review applications to maintain quality, balance teams, and manage the participant experience.'],
    ],
  },
  {
    title: 'Mentors, Support, and Community',
    items: [
      ['Will there be mentors?', 'Yes. Each track will have mentors with relevant domain and technical experience.'],
      ['How can I book mentor time?', 'Mentor sessions will be booked through the event scheduling system during the pre-hack and sprint periods.'],
      ['Will there be help during the hackathon?', 'Yes. A help desk and community support system will be available for technical issues, submission questions, and event support.'],
      ['What platform will participants use?', 'The event will use a mix of Discord, a virtual venue, a website, and submission/judging tools. The exact stack will be published before the event.'],
    ],
  },
  {
    title: 'Data, Tools, and Project Rules',
    items: [
      ['Will datasets be provided?', 'Yes. Each track will include curated data sources or APIs so teams do not have to spend time searching for everything themselves.'],
      ['Do I need to build something deployable?', 'Yes. ClimateOS prioritises real-world usefulness, not just slides. Teams are expected to submit a working project with documentation.'],
      ['Can I use external APIs or cloud tools?', 'Yes, as long as the project fits the rules and respects the event constraints for each track.'],
      ['Are open-source submissions required?', 'Open-source output is strongly encouraged, and the event is designed around sharing projects publicly.'],
    ],
  },
  {
    title: 'Judging and Prizes',
    items: [
      ['How will projects be judged?', 'Projects will be evaluated asynchronously first through submissions, then top teams will present live during finals.'],
      ['What will judges look for?', 'Judging will focus on climate impact potential, technical execution, deployment readiness, innovation, and presentation quality.'],
      ['What prizes are available?', 'There will be a grand prize, track prizes, and additional recognitions such as best open-source project, best newcomer team, and people choice.'],
      ['Is there any condition attached to the grand prize?', 'Yes. The grand prize includes an impact clause, which means the winning team must show evidence of real-world deployment or user testing after the event before the full award is released.'],
    ],
  },
  {
    title: 'Submissions',
    items: [
      ['What do we need to submit?', 'Teams will submit a short demo video, a GitHub repository, and a concise README or project summary.'],
      ['Will there be a live demo requirement?', 'Top teams will present live at the finals, but initial judging is asynchronous.'],
      ['What happens if we have technical issues during submission?', 'Backup submission steps will be available so teams are not blocked by a single tool failure.'],
    ],
  },
  {
    title: 'After the Event',
    items: [
      ['Will projects be published after the hackathon?', 'Yes. Accepted projects are expected to be added to the ClimateOS Open Library.'],
      ['Will there be certificates?', 'Yes. Participants will receive digital certificates.'],
      ['Will the community continue after the event?', 'Yes. The event is designed to grow into a long-term climate builder community with follow-up events, newsletters, and ongoing project visibility.'],
    ],
  },
  {
    title: 'Contact and Questions',
    items: [
      ['How can I ask questions?', 'You can reach us directly via email at climateos26@gmail.com. We will get back to you as soon as possible.'],
    ],
  },
];

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="rounded-xl border border-site-border bg-site-card-elevated overflow-hidden transition-all duration-300 hover:border-primary/20 hover:shadow-md hover:shadow-primary/5">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full text-left p-4 cursor-pointer focus:outline-none transition-colors text-site-text hover:text-primary select-none flex items-center justify-between gap-4 font-semibold text-base"
      >
        <span>{question}</span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2, ease: 'easeInOut' }}
          className="flex-shrink-0 text-primary"
        >
          <ChevronDown size={18} />
        </motion.div>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="px-4 pb-4 text-sm leading-relaxed text-site-muted border-t border-site-border/30 pt-3 transition-colors bg-site-card/30">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-site-bg pt-16 transition-colors duration-300">
        <section className="relative overflow-hidden bg-transparent">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_10%_15%,var(--glow-3),transparent_30%),radial-gradient(circle_at_75%_8%,var(--glow-1),transparent_28%)] transition-colors duration-300" />
          
          <div className="relative mx-auto max-w-6xl px-4 py-20">
            {/* Header section card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-3xl border border-site-border bg-site-card p-8 backdrop-blur md:p-12 shadow-sm transition-all duration-300"
            >
              <div className="flex items-center gap-2">
                <HelpCircle className="text-primary h-5 w-5 animate-pulse" />
                <p className="text-xs uppercase tracking-[0.22em] text-primary transition-colors duration-300 font-semibold">
                  Frequently Asked Questions
                </p>
              </div>
              <h1 className="mt-3 font-display text-4xl font-extrabold text-site-text md:text-5xl tracking-tight transition-colors duration-300">
                ClimateOS 2026 FAQ
              </h1>
              <p className="mt-4 max-w-4xl text-site-muted transition-colors duration-300 leading-relaxed text-base md:text-lg">
                ClimateOS 2026 is a 48-hour, fully online climate-tech hackathon for builders, designers, researchers,
                and problem-solvers around the world.
              </p>
              <div className="mt-8 rounded-2xl border border-site-border bg-site-card-elevated p-6 shadow-sm transition-colors relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-full blur-2xl group-hover:bg-primary/10 transition-colors duration-300" />
                <h2 className="font-display text-2xl font-bold text-primary">Coming Soon</h2>
                <p className="mt-2 text-site-muted">
                  We are building the full event experience now. Applications, track details, mentor announcements,
                  and the participant handbook will be released soon.
                </p>
              </div>
            </motion.div>

            {/* Accordion List by Section */}
            <div className="mt-8 space-y-8">
              {FAQ_SECTIONS.map((section, sectionIdx) => (
                <motion.section
                  key={section.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-100px' }}
                  transition={{ duration: 0.5, delay: sectionIdx * 0.05 }}
                  className="rounded-3xl border border-site-border bg-site-card p-6 md:p-8 shadow-sm transition-colors"
                >
                  <h2 className="font-display text-2xl font-bold text-site-text tracking-tight border-b border-site-border/30 pb-3">
                    {section.title}
                  </h2>
                  <div className="mt-6 space-y-4">
                    {section.items.map(([question, answer]) => (
                      <FAQItem key={question} question={question} answer={answer} />
                    ))}
                  </div>
                </motion.section>
              ))}
            </div>

            {/* Footer note card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mt-8 rounded-3xl border border-site-border bg-site-card-elevated p-6 md:p-8 shadow-sm transition-colors duration-300"
            >
              <h2 className="font-display text-2xl font-bold text-primary">Final Note</h2>
              <p className="mt-3 text-site-muted leading-relaxed">
                ClimateOS 2026 is being built for people who want to make climate work real, useful, and deployable.
                If you care about solving urgent problems with code, data, design, or systems thinking, this is for you.
              </p>
              <p className="mt-2 text-xs text-site-muted-dark font-medium">More details are coming soon.</p>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}