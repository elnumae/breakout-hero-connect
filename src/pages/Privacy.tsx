import { Footer } from "@/components/Footer";

const Privacy = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <h1 className="text-4xl font-bold text-center mb-8">Privacy Policy – BreakoutTalents</h1>
        <p className="text-muted-foreground text-center mb-12">Last updated: August 24, 2025</p>
        
        <div className="prose prose-slate dark:prose-invert max-w-none">
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">1. Introduction</h2>
            <p className="mb-4">
              Welcome to BreakoutTalents, an AI-first headhunting service for VC-backed startups in Germany. 
              Protecting your privacy and handling your personal data responsibly is important to us.
            </p>
            <p className="mb-4">This Privacy Policy explains:</p>
            <ul className="list-disc pl-6 mb-4">
              <li>what personal information we collect,</li>
              <li>how we use it,</li>
              <li>the services and tools we rely on,</li>
              <li>your rights under the General Data Protection Regulation (GDPR).</li>
            </ul>
            <p>
              By using BreakoutTalents, you agree to the practices described here. If you do not agree, 
              please discontinue use of our services.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">2. Data We Collect</h2>
            <p className="mb-4">We collect and process the following types of information:</p>
            <ul className="list-disc pl-6 mb-4">
              <li><strong>Basic Identifiers:</strong> name, email, phone number.</li>
              <li><strong>Professional Data:</strong> LinkedIn profile, CV, job title, employer history, skills, salary expectations.</li>
              <li><strong>Recruiting Notes:</strong> information shared during calls, interviews, or assessments (e.g. fit notes, availability, preferences).</li>
              <li><strong>Referral Data:</strong> information provided by referrers (referrer's contact details, candidate's LinkedIn/email).</li>
              <li><strong>Payment Data (referrers only):</strong> bank account or PayPal details, used exclusively for processing referral bonuses.</li>
            </ul>
            <p>
              We do not intentionally collect special categories of data (e.g. race, religion, health). 
              If such data is shared voluntarily, it will not be used in hiring decisions.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">3. How We Use Your Data</h2>
            <p className="mb-4">Your personal data is used strictly to provide and improve our services:</p>
            <ul className="list-disc pl-6 mb-4">
              <li><strong>Talent Matching:</strong> connecting candidates with suitable startups.</li>
              <li><strong>Introductions:</strong> sharing candidate profiles with potential employers (with your consent).</li>
              <li><strong>Referral Program:</strong> tracking referrals and paying out bonuses.</li>
              <li><strong>Service Improvement:</strong> enhancing our sourcing, matching and AI vetting processes.</li>
              <li><strong>Communication:</strong> sending relevant job updates or service information (opt-in only).</li>
              <li><strong>Compliance & Security:</strong> fraud prevention, GDPR/legal compliance.</li>
            </ul>
            <p>We do not sell or rent your data to third parties.</p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">4. AI & Automated Processing</h2>
            <p className="mb-4">
              BreakoutTalents uses AI-driven tools (e.g. ChatGPT, Gemini, Clay enrichment models) to help 
              vet and prioritize candidate profiles.
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li><strong>Purpose:</strong> improve matching accuracy, reduce bias, and speed up the hiring process.</li>
              <li><strong>Transparency:</strong> no fully automated hiring decisions are made — final decisions always involve human judgment.</li>
              <li><strong>Your Rights:</strong> you may request human review if you feel an automated step has negatively affected you.</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">5. Third-Party Services</h2>
            <p className="mb-4">To operate efficiently, BreakoutTalents uses trusted third-party services, including:</p>
            <ul className="list-disc pl-6 mb-4">
              <li>Clay, Juicebox, Notion (candidate enrichment & sourcing tools – US-based).</li>
              <li>Lemlist (outreach tool – EU & US servers).</li>
              <li>Google Workspace (communication & storage – EU & US servers).</li>
              <li>LinkedIn (talent sourcing – global).</li>
            </ul>
            <p>
              Where data is transferred outside the EU/EEA, we use Standard Contractual Clauses (SCCs) 
              and encryption to ensure GDPR compliance.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">6. Data Sharing</h2>
            <p className="mb-4">We may share your data in these situations:</p>
            <ul className="list-disc pl-6 mb-4">
              <li><strong>With employers:</strong> when introducing you as a potential candidate.</li>
              <li><strong>With referrers:</strong> only to confirm that a referral was successful (no sensitive details shared).</li>
              <li><strong>With service providers:</strong> as listed above, for processing, enrichment, or storage.</li>
              <li><strong>For legal reasons:</strong> if required by law or regulatory authorities.</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">7. Data Retention</h2>
            <ul className="list-disc pl-6 mb-4">
              <li><strong>Candidates & Referrals:</strong> retained for up to 2 years after the last interaction.</li>
              <li><strong>Referrer Payment Data:</strong> used only for processing payouts and deleted once complete, unless required by law.</li>
            </ul>
            <p>You can request earlier deletion (see Section 9).</p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">8. Security Measures</h2>
            <p>
              We implement industry-standard security (encryption, access controls, monitoring) to protect 
              your personal data against unauthorized access or loss.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">9. Your Rights (GDPR)</h2>
            <p className="mb-4">As a data subject, you have the following rights under GDPR:</p>
            <ul className="list-disc pl-6 mb-4">
              <li><strong>Access:</strong> request a copy of the data we hold about you.</li>
              <li><strong>Rectification:</strong> correct inaccurate or incomplete data.</li>
              <li><strong>Deletion:</strong> request deletion of your data ("right to be forgotten").</li>
              <li><strong>Restriction:</strong> limit how your data is processed.</li>
              <li><strong>Objection:</strong> object to processing based on legitimate interests.</li>
              <li><strong>Portability:</strong> request your data in a structured, machine-readable format.</li>
            </ul>
            <p>
              To exercise your rights, contact us at{" "}
              <a href="mailto:hi@emanuelmorhard.com" className="text-primary hover:text-primary/80">
                hi@emanuelmorhard.com
              </a>
              .
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">10. International Transfers</h2>
            <p className="mb-4">Since some service providers are US-based, data may be transferred outside the EU. We ensure compliance via:</p>
            <ul className="list-disc pl-6 mb-4">
              <li>Standard Contractual Clauses (SCCs),</li>
              <li>encryption during transfer,</li>
              <li>only working with providers who meet high privacy standards.</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">11. Cookies & Tracking</h2>
            <p className="mb-4">BreakoutTalents uses cookies and tracking tools for:</p>
            <ul className="list-disc pl-6 mb-4">
              <li>Essential functionality (site security, login).</li>
              <li>Analytics (understanding site usage, improving services).</li>
              <li>Marketing (measuring campaign performance).</li>
            </ul>
            <p>
              You can adjust cookie preferences in your browser. Disabling cookies may limit site functionality.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">12. Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. Significant changes will be communicated via our website.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">13. Contact Information</h2>
            <p className="mb-4">For questions or to exercise your rights, please contact:</p>
            <p>
              <strong>BreakoutTalents – Privacy Team</strong><br />
              Email:{" "}
              <a href="mailto:hi@emanuelmorhard.com" className="text-primary hover:text-primary/80">
                hi@emanuelmorhard.com
              </a>
            </p>
          </section>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Privacy;