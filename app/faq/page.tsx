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
      ['When will ClimateOS 2026 take place?', 'The sprint is scheduled for October 10-12, 2026, and the finals are scheduled for October 17, 2026.'],
      ['What does "coming soon" mean right now?', 'It means the event website is still being prepared. We are finalising the full public launch content, including applications, FAQs, track explainers, and the waitlist.'],
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
      ['Will there be a waitlist?', 'Yes. A waitlist will open before applications launch so interested builders can get early updates.'],
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
    title: 'Contact and Updates',
    items: [
      ['How do I stay updated?', 'Join the waitlist and follow official event updates on the website as launch content is released.'],
      ['Where can I ask questions?', 'A live help desk and community channels will be available once the event page goes public.'],
    ],
  },
];

export default function FAQPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#04110f] pt-16">
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_10%_15%,rgba(52,211,153,0.18),transparent_30%),radial-gradient(circle_at_75%_8%,rgba(34,211,238,0.14),transparent_28%)]" />
          <div className="relative mx-auto max-w-6xl px-4 py-20">
            <div className="rounded-3xl border border-emerald-100/20 bg-[#071613]/80 p-8 backdrop-blur md:p-12">
              <p className="text-xs uppercase tracking-[0.22em] text-emerald-100/70">Frequently Asked Questions</p>
              <h1 className="mt-3 font-display text-4xl font-bold text-emerald-50 md:text-5xl">ClimateOS 2026 FAQ</h1>
              <p className="mt-4 max-w-4xl text-emerald-50/80">
                ClimateOS 2026 is a 48-hour, fully online climate-tech hackathon for builders, designers, researchers,
                and problem-solvers around the world.
              </p>
              <div className="mt-8 rounded-2xl border border-emerald-100/15 bg-emerald-300/10 p-5">
                <h2 className="font-display text-2xl font-bold text-emerald-100">Coming Soon</h2>
                <p className="mt-2 text-emerald-50/75">
                  We are building the full event experience now. Applications, track details, mentor announcements,
                  and the participant handbook will be released soon.
                </p>
              </div>
            </div>

            <div className="mt-8 space-y-6">
              {FAQ_SECTIONS.map((section) => (
                <section key={section.title} className="rounded-3xl border border-emerald-100/20 bg-[#061512]/75 p-6 md:p-8">
                  <h2 className="font-display text-2xl font-bold text-emerald-100">{section.title}</h2>
                  <div className="mt-4 space-y-3">
                    {section.items.map(([question, answer]) => (
                      <details key={question} className="rounded-xl border border-emerald-100/15 bg-[#071a16] p-4 open:bg-[#0a231d]">
                        <summary className="cursor-pointer list-none text-base font-semibold text-emerald-50">
                          {question}
                        </summary>
                        <p className="mt-3 text-sm leading-relaxed text-emerald-50/75">{answer}</p>
                      </details>
                    ))}
                  </div>
                </section>
              ))}
            </div>

            <div className="mt-8 rounded-3xl border border-cyan-100/20 bg-[#031019]/80 p-6 md:p-8">
              <h2 className="font-display text-2xl font-bold text-cyan-100">Final Note</h2>
              <p className="mt-3 text-cyan-50/80">
                ClimateOS 2026 is being built for people who want to make climate work real, useful, and deployable.
                If you care about solving urgent problems with code, data, design, or systems thinking, this is for you.
              </p>
              <p className="mt-2 text-cyan-50/70">More details are coming soon.</p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}