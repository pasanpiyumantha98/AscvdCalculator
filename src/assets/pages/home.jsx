import React, { useMemo, useState } from "react";
import Footer from "../components/footer";
import Header from "../components/header";

/**
 * ASCVD Risk Calculator (10-year) – Pooled Cohort Equations (PCE, 2013)
 * For adults 40–79 years without known ASCVD and LDL-C < 190 mg/dL.
 * This is an educational demo and not medical advice.
 *
 * risk = 1 − S0 ^ exp( LP − mean_xb )
 * where LP is a log-linear combination of inputs + interactions.
 *
 * Notes:
 * - PCE uses sex-specific equations and strata: "Black" vs "White/Other".
 * - If your population doesn’t match those strata, many regions use White/Other as default,
 *   or prefer a race-free model (e.g., PREVENT 2023).
 * - You can add a race-free toggle later if you want.
 */

// Coefficient table: commonly cited public values (verify for production use).
const COEFFS = {
  // White / Other MEN
  "male_white_other": {
    ln_age: 12.344,
    ln_tc: 11.853,
    ln_age_ln_tc: -2.664,
    ln_hdl: -7.990,
    ln_age_ln_hdl: 1.769,
    ln_treated_sbp: 1.797,
    ln_age_ln_treated_sbp: -0.348,
    ln_untreated_sbp: 1.764,
    ln_age_ln_untreated_sbp: -0.269,
    smoker: 7.837,
    ln_age_smoker: -1.795,
    diabetes: 0.658,
    s0_10yr: 0.9144,
    mean_xb: 61.18,
  },

  // Black MEN (verify before production)
  "male_black": {
    ln_age: 2.469,
    ln_tc: 0.302,
    ln_hdl: -0.307,
    ln_treated_sbp: 1.916,
    ln_untreated_sbp: 1.809,
    smoker: 0.549,
    diabetes: 0.645,
    s0_10yr: 0.8954,
    mean_xb: 19.54,
  },

  // White / Other WOMEN
  "female_white_other": {
    ln_age: -29.799,
    ln_age_sq: 4.884,
    ln_tc: 13.540,
    ln_age_ln_tc: -3.114,
    ln_hdl: -13.578,
    ln_age_ln_hdl: 3.149,
    ln_treated_sbp: 2.019,
    ln_untreated_sbp: 1.957,
    smoker: 7.574,
    ln_age_smoker: -1.665,
    diabetes: 0.661,
    s0_10yr: 0.9665,
    mean_xb: -29.18,
  },

  // Black WOMEN (verify before production)
  "female_black": {
    ln_age: 17.114,
    ln_tc: 0.940,
    ln_hdl: -18.920,
    ln_treated_sbp: 29.291,
    ln_untreated_sbp: 27.820,
    smoker: 0.691,
    diabetes: 0.874,
    s0_10yr: 0.9533,
    mean_xb: 86.61,
  },
};

function clamp(n, min, max) {
  return Math.min(max, Math.max(min, n));
}

function calculateAscvdPCE(input) {
  const { age, sex, race, totalChol, hdl, sbp, onBpMeds, smoker, diabetes } = input;
  if (age < 40 || age > 79) throw new Error("PCE valid age range is 40–79 years");
  const c = COEFFS[`${sex}_${race}`];
  if (!c) throw new Error("Missing coefficient set for selected sex/race");

  const ln_age = Math.log(age);
  const ln_tc = Math.log(totalChol);
  const ln_hdl = Math.log(hdl);
  const ln_sbp = Math.log(sbp);

  let lp = 0;
  lp += c.ln_age * ln_age;
  if (c.ln_age_sq) lp += c.ln_age_sq * (ln_age * ln_age);
  lp += c.ln_tc * ln_tc;
  if (c.ln_age_ln_tc) lp += c.ln_age_ln_tc * (ln_age * ln_tc);
  lp += c.ln_hdl * ln_hdl;
  if (c.ln_age_ln_hdl) lp += c.ln_age_ln_hdl * (ln_age * ln_hdl);

  if (onBpMeds) {
    if (c.ln_treated_sbp) lp += c.ln_treated_sbp * ln_sbp;
    if (c.ln_age_ln_treated_sbp) lp += c.ln_age_ln_treated_sbp * (ln_age * ln_sbp);
  } else {
    if (c.ln_untreated_sbp) lp += c.ln_untreated_sbp * ln_sbp;
    if (c.ln_age_ln_untreated_sbp) lp += c.ln_age_ln_untreated_sbp * (ln_age * ln_sbp);
  }

  lp += c.smoker * (smoker ? 1 : 0);
  if (c.ln_age_smoker) lp += c.ln_age_smoker * (smoker ? ln_age : 0);
  lp += c.diabetes * (diabetes ? 1 : 0);

  const risk = 1 - Math.pow(c.s0_10yr, Math.exp(lp - c.mean_xb));
  return clamp(risk, 0, 1);
}

// Small UI helpers (plain JS)
function Field({ label, children }) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm text-gray-700 font-medium">{label}</label>
      {children}
    </div>
  );
}

function NumberInput({ value, onChange, min, max, step = 1, suffix }) {
  return (
    <div className="flex items-center gap-3">
      <input
        type="number"
        className="border rounded-xl px-3 py-2 w-44"
        value={value}
        min={min}
        max={max}
        step={step}
        onChange={(e) => onChange(Number(e.target.value))}
      />
      {suffix && <span className="text-xs text-gray-500">{suffix}</span>}
    </div>
  );
}

function RiskBadge({ risk }) {
  const pct = (risk * 100).toFixed(1);
  let label = "Low", cls = "bg-green-100 text-green-800";
  if (risk >= 0.05 && risk < 0.075) { label = "Borderline"; cls = "bg-yellow-100 text-yellow-800"; }
  else if (risk >= 0.075 && risk < 0.20) { label = "Intermediate"; cls = "bg-orange-100 text-orange-800"; }
  else if (risk >= 0.20) { label = "High"; cls = "bg-red-100 text-red-800"; }
  return (
    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold ${cls}`}>
      {pct}% · {label}
    </span>
  );
}

export default function Home() {
  const [inputs, setInputs] = useState({
    age: 55,
    sex: "male",
    race: "white_other",
    totalChol: 213,
    hdl: 50,
    sbp: 120,
    onBpMeds: false,
    smoker: false,
    diabetes: false,
  });

  const risk = useMemo(() => {
    try { return calculateAscvdPCE(inputs); }
    catch { return NaN; }
  }, [inputs]);

  return (
    <div className="min-h-screen bg-gray-50">
     
     <Header/>
     

      {/* Main */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* Calculator */}
        <section className="grid md:grid-cols-2 gap-6">
          {/* Inputs */}
          <div className="bg-white rounded-2xl shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Enter your values</h2>
            <div className="grid grid-cols-2 gap-4">
              <Field label="Age (years)">
                <NumberInput value={inputs.age} onChange={(v) => setInputs({ ...inputs, age: v })} min={40} max={79} />
              </Field>

              <Field label="Sex">
                <select
                  className="border rounded-xl px-3 py-2"
                  value={inputs.sex}
                  onChange={(e) => setInputs({ ...inputs, sex: e.target.value })}
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </Field>

              <Field label="Race (PCE strata)">
                <select
                  className="border rounded-xl px-3 py-2"
                  value={inputs.race}
                  onChange={(e) => setInputs({ ...inputs, race: e.target.value })}
                >
                  <option value="white_other">White / Other</option>
                  <option value="black">Black (African American)</option>
                </select>
                <p className="text-[11px] text-gray-500 mt-1">
                  If your region doesn’t match, use “White/Other” or a race-free model (e.g., PREVENT 2023).
                </p>
              </Field>

              <Field label="Total Cholesterol">
                <NumberInput
                  value={inputs.totalChol}
                  onChange={(v) => setInputs({ ...inputs, totalChol: v })}
                  min={100} max={400} step={1} suffix="mg/dL"
                />
              </Field>

              <Field label="HDL Cholesterol">
                <NumberInput
                  value={inputs.hdl}
                  onChange={(v) => setInputs({ ...inputs, hdl: v })}
                  min={20} max={120} step={1} suffix="mg/dL"
                />
              </Field>

              <Field label="Systolic BP">
                <NumberInput
                  value={inputs.sbp}
                  onChange={(v) => setInputs({ ...inputs, sbp: v })}
                  min={90} max={200} step={1} suffix="mmHg"
                />
              </Field>

              <Field label="On BP-lowering meds?">
                <select
                  className="border rounded-xl px-3 py-2"
                  value={inputs.onBpMeds ? "yes" : "no"}
                  onChange={(e) => setInputs({ ...inputs, onBpMeds: e.target.value === "yes" })}
                >
                  <option value="no">No</option>
                  <option value="yes">Yes</option>
                </select>
              </Field>

              <Field label="Current smoker?">
                <select
                  className="border rounded-xl px-3 py-2"
                  value={inputs.smoker ? "yes" : "no"}
                  onChange={(e) => setInputs({ ...inputs, smoker: e.target.value === "yes" })}
                >
                  <option value="no">No</option>
                  <option value="yes">Yes</option>
                </select>
              </Field>

              <Field label="Diabetes?">
                <select
                  className="border rounded-xl px-3 py-2"
                  value={inputs.diabetes ? "yes" : "no"}
                  onChange={(e) => setInputs({ ...inputs, diabetes: e.target.value === "yes" })}
                >
                  <option value="no">No</option>
                  <option value="yes">Yes</option>
                </select>
              </Field>
            </div>
          </div>

          {/* Output */}
          <div className="bg-white rounded-2xl shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Result</h2>
            {Number.isFinite(risk) ? (
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="text-5xl font-bold">{(risk * 100).toFixed(1)}%</div>
                  <RiskBadge risk={risk} />
                </div>
                <div className="text-sm text-gray-700 leading-6">
                  <p className="font-medium mb-1">Interpretation (ACC/AHA):</p>
                  <ul className="list-disc pl-5">
                    <li>Low: &lt;5%</li>
                    <li>Borderline: 5–7.4%</li>
                    <li>Intermediate: 7.5–19.9%</li>
                    <li>High: ≥20%</li>
                  </ul>
                </div>
                <div className="text-xs text-gray-500">
                  Use this estimate to support shared decision-making. CAC scoring may help when risk is borderline/intermediate.
                </div>
              </div>
            ) : (
              <div className="text-sm text-red-600">Inputs out of range for PCE (age 40–79). Adjust and retry.</div>
            )}
          </div>
        </section>

        {/* --------- Educational Content (~1500+ words) --------- */}
        <section className="mt-10 space-y-8">
          <article className="bg-white rounded-2xl shadow p-6 leading-7 text-gray-800">
            <h2 className="text-2xl font-bold mb-3">What is ASCVD risk and why does it matter?</h2>
            <p>
              Atherosclerotic cardiovascular disease (ASCVD) describes heart attacks, strokes, and other problems caused by plaque
              accumulating inside the arteries. The 10-year ASCVD risk estimate quantifies the chance that someone without known
              cardiovascular disease will experience a first major event in the next decade. Rather than being a diagnosis on its
              own, this number functions as a shared decision-making tool. It creates a common language to weigh the potential
              benefits and trade-offs of preventive therapies such as statins, blood pressure medications, smoking cessation
              programs, and lifestyle interventions focused on nutrition and activity. When estimated risk is very low, the
              absolute benefit of medication might be small; when risk is higher, preventive treatment can meaningfully reduce the
              likelihood of events like myocardial infarction or ischemic stroke.
            </p>
            <p>
              The calculator on this page implements the Pooled Cohort Equations (PCE), first published in 2013 and widely used in
              guidelines and clinical practice. The PCE were derived from large cohorts and validated across multiple studies. They
              are most appropriate for adults aged 40–79 years with no prior ASCVD and LDL-C below 190 mg/dL. Although the PCE are
              influential, they are not perfect; different populations may exhibit different baseline risks, and clinicians often
              consider additional context such as family history, coronary artery calcium (CAC) scoring, chronic kidney disease,
              inflammatory disorders, or the presence of multiple risk enhancers when counseling patients.
            </p>
          </article>

          <article className="bg-white rounded-2xl shadow p-6 leading-7 text-gray-800">
            <h2 className="text-2xl font-bold mb-3">How to enter your numbers correctly</h2>
            <p>
              To get a meaningful estimate, input quality matters. Age is entered in whole years (range 40–79). Total cholesterol
              and HDL cholesterol come from your lab report and are entered in mg/dL. Systolic blood pressure (SBP)—the top
              number in your blood pressure reading—is entered in mmHg. If you are currently taking BP-lowering medicines (for
              example, ACE inhibitors, ARBs, calcium-channel blockers, thiazides, or beta-blockers), switch the “On BP-lowering
              meds?” setting to Yes. Mark “Current smoker” if you actively smoke cigarettes now (the PCE’s original definition of
              “smoker” refers to current smoking). Choose “Yes” for diabetes if you have a clinician-diagnosed type 1 or type 2
              diabetes mellitus.
            </p>
            <p>
              A few common pitfalls can throw off results. First, don’t mix up units: some countries report cholesterol in
              mmol/L—multiply by 38.67 to convert to mg/dL. Second, make sure you enter systolic rather than diastolic pressure.
              Third, remember that BP bounces around; use a well-measured average rather than a single rushed reading. In a
              clinic, that typically means sitting quietly for several minutes, having the right cuff size, keeping your arm at
              heart level, and repeating an elevated reading to confirm it.
            </p>
          </article>

          <article className="bg-white rounded-2xl shadow p-6 leading-7 text-gray-800">
            <h2 className="text-2xl font-bold mb-3">Interpreting the result</h2>
            <p>
              Your 10-year ASCVD risk appears above as a percentage alongside an interpretation badge. These categories are a
              practical way to frame follow-up steps:
            </p>
            <ul className="list-disc pl-6">
              <li><span className="font-medium">Low (&lt;5%)</span> – Prioritize lifestyle optimization; routine statin therapy is usually not indicated unless other compelling factors exist.</li>
              <li><span className="font-medium">Borderline (5–7.4%)</span> – Review risk enhancers (family history of premature ASCVD, chronic kidney disease, inflammatory conditions, high triglycerides, South Asian ancestry, and others). If decisions are uncertain, a CAC scan may help refine risk estimation.</li>
              <li><span className="font-medium">Intermediate (7.5–19.9%)</span> – Many people benefit from moderate- to high-intensity statin therapy after discussing benefits, side effects, and preferences. CAC can refine the decision if you’re on the cusp.</li>
              <li><span className="font-medium">High (≥20%)</span> – Preventive medications are typically recommended unless contraindicated, in addition to intensive lifestyle measures.</li>
            </ul>
            <p>
              Two people can share the same total risk for very different reasons. One may have elevated cholesterol with great
              blood pressure and no diabetes; another might have normal lipids but smoke and live with diabetes. Looking at the
              individual inputs helps identify where action can most effectively lower risk—smoking cessation, better BP control,
              or lipid management, for instance.
            </p>
          </article>

          <article className="bg-white rounded-2xl shadow p-6 leading-7 text-gray-800">
            <h2 className="text-2xl font-bold mb-3">Limitations and appropriate use</h2>
            <p>
              All risk equations are simplifications. The PCE should not be used for patients with known ASCVD, very high LDL
              (≥190 mg/dL), or suspected familial hypercholesterolemia. The equations were derived primarily from US cohorts of
              non-Hispanic White and Black participants; if you are applying the tool to a different population, absolute risks
              may be miscalibrated. Some health systems use locally validated tools or recalibrated PCE models to account for
              regional differences in event rates and risk factor distributions.
            </p>
            <p>
              Age strongly influences the score, which means risk can rise over time even if other numbers remain stable. That’s a
              feature of population-level modeling but can feel counterintuitive to individuals who maintain good health
              behaviors. Social determinants of health, sleep quality, stress, diet, and adherence also influence outcomes yet
              aren’t fully captured in the equation. Use the estimate to support nuanced conversations rather than dictate a
              single “correct” plan.
            </p>
          </article>

          <article className="bg-white rounded-2xl shadow p-6 leading-7 text-gray-800">
            <h2 className="text-2xl font-bold mb-3">What can lower risk?</h2>
            <p>
              Lifestyle change is powerful and often the highest-value first step. Quitting smoking yields a rapid decline in
              cardiovascular risk; within a few years, the likelihood of coronary events falls substantially compared with
              continued smoking. Regular physical activity—such as brisk walking for at least 150 minutes per week—improves blood
              pressure, HDL cholesterol, insulin sensitivity, and weight management. Dietary patterns emphasizing vegetables,
              fruits, legumes, whole grains, nuts, and unsaturated fats, while limiting added sugars, refined carbohydrates, and
              trans fats, can lower LDL and support better long-term health. Moderation of alcohol, adequate sleep, and stress
              management also help.
            </p>
            <p>
              Medications add absolute risk reduction when baseline risk is elevated or lifestyle changes alone aren’t enough.
              Statins reduce LDL cholesterol and lower major cardiovascular events; BP medicines reduce stroke and coronary risk;
              and in diabetes, certain glucose-lowering therapies improve cardiovascular outcomes beyond glucose control.
              Selecting therapy and intensity involves balancing expected benefit, potential side effects, drug interactions,
              cost, and individual preferences—best decided through shared decision-making.
            </p>
          </article>

          <article className="bg-white rounded-2xl shadow p-6 leading-7 text-gray-800">
            <h2 className="text-2xl font-bold mb-3">How Cholesterol can affect your ASCVD risk?</h2>
            <p class="pb-2">
             High cholesterol is one of the most influential and modifiable risk factors for ASCVD (Atherosclerotic Cardiovascular Disease). Cholesterol itself is not inherently bad, the body needs it to build cells, produce hormones, and support vital functions. However, when there is too much cholesterol circulating in the blood, especially in the form of LDL (low-density lipoprotein), it begins to cause harm to the arteries. LDL cholesterol can slowly deposit along the inner walls of arteries, leading to the formation of fatty plaques. These plaques make the arterial walls thicker and less flexible, a condition known as atherosclerosis, which reduces oxygen-rich blood flow to the heart and other organs.
            </p>
            <p class="pb-2">
             Over time, these plaques may rupture, prompting the body to form blood clots at the site of injury. A clot that blocks blood flow to the heart can cause a heart attack, while a clot in an artery leading to the brain can cause a stroke. That’s why LDL cholesterol is often referred to as “bad cholesterol.” On the other hand, HDL (high-density lipoprotein) cholesterol acts as a cleaner, carrying excess LDL cholesterol from the bloodstream back to the liver, where it can be broken down and removed. Higher levels of HDL are associated with a lower risk of heart disease because HDL helps keep arteries clear and prevents plaque buildup.
            </p>
            <p class="pb-2">
           Doctors use cholesterol measurements including total cholesterol, LDL, HDL, and triglycerides as essential inputs in ASCVD risk calculators. These tools estimate a person’s 10-year and lifetime risk of developing cardiovascular disease by combining cholesterol levels with other factors like age, sex, blood pressure, smoking status, and diabetes. Typically, individuals with LDL above 160 mg/dL or HDL below 40 mg/dL face a much higher risk, while maintaining LDL below 100 mg/dL and HDL above 60 mg/dL is considered optimal.
             </p>
            <p class="pb-2">
           Lifestyle choices play a key role in managing cholesterol and, consequently, ASCVD risk. Diets high in saturated fats, trans fats, and processed foods tend to raise LDL cholesterol, whereas diets rich in fruits, vegetables, whole grains, lean proteins, and healthy fats (like those from olive oil, avocados, and fish) help improve lipid profiles. Regular physical activity can raise HDL cholesterol and lower LDL, while quitting smoking and maintaining a healthy weight further reduce overall cardiovascular risk. In some cases, when lifestyle changes aren’t enough, doctors may prescribe statins or other lipid-lowering medications to control cholesterol levels and protect against plaque buildup.
               </p>
          </article>

          <article className="bg-white rounded-2xl shadow p-6 leading-7 text-gray-800">
            <h2 className="text-2xl font-bold mb-3">Scenario explorer: what actually shifts the needle?</h2>
            <p>
              Without adding any extra UI complexity, you can still think through “what-if” changes that often move the result:
            </p>
            <ul className="list-disc pl-6">
              <li><span className="font-medium">Smoking → not smoking:</span> tends to lower risk categorically, especially if you’re in a borderline range.</li>
              <li><span className="font-medium">LDL reduction with statins:</span> the PCE uses total cholesterol and HDL, not LDL directly, but typical moderate-intensity statins reduce LDL by ~30% (and total cholesterol similarly), often enough to move the calculated risk down.</li>
              <li><span className="font-medium">BP control:</span> bringing SBP down (e.g., from 140 to 125 mmHg) can significantly decrease risk, particularly when treated hypertension is a major contributor to your estimate.</li>
              <li><span className="font-medium">Aging:</span> risk gradually rises with age even if your other numbers stay steady; that’s expected behavior of the model.</li>
            </ul>
            <p>
              If you want, this page can be extended with sliders to model these changes in real time and visualize the effect on
              the risk percentage. A small chart or delta readout can make the discussion even clearer.
            </p>
          </article>

          <article className="bg-white rounded-2xl shadow p-6 leading-7 text-gray-800">
            <h2 className="text-2xl font-bold mb-3">FAQ</h2>
            <h3 className="text-xl font-semibold mt-4">Does the calculator work outside the US?</h3>
            <p>
              It offers a ballpark estimate, but calibration can differ across countries and ethnic groups. Some regions prefer
              tools such as QRISK or SCORE2. If you’re building for a specific population, consider adding multiple models or
              validating the PCE locally.
            </p>
            <h3 className="text-xl font-semibold mt-4">What if LDL is ≥ 190 mg/dL?</h3>
            <p>
              Very high LDL generally warrants evaluation and treatment independent of the 10-year risk estimate, often including
              high-intensity statin therapy and family screening for genetic lipid disorders. The PCE are not designed for that
              group.
            </p>
            <h3 className="text-xl font-semibold mt-4">Why is there a “race” field?</h3>
            <p>
              The original 2013 PCE used sex- and race-specific equations (Black vs White/Other) reflecting the cohorts from which
              they were derived. Many organizations now emphasize race-free tools to avoid using race as a proxy for complex social
              and structural factors. This demo keeps the original specification for transparency and can be extended with a
              race-free alternative.
            </p>
            <h3 className="text-xl font-semibold mt-4">How often should I recalculate my risk?</h3>
            <p>
              In stable adults without major changes, every 4–6 years is common. Reassess sooner if medications start/stop, if you
              quit or start smoking, if BP control changes, or if you receive a new diagnosis such as diabetes. After significant
              lifestyle improvements, repeating the estimate can help illustrate progress.
            </p>
            <h3 className="text-xl font-semibold mt-4">Do I need fasting labs?</h3>
            <p>
              Non-fasting total cholesterol and HDL are acceptable for risk estimation in most cases. Triglycerides and calculated
              LDL are more sensitive to fasting status, but this calculator doesn’t directly input triglycerides or LDL.
            </p>
          </article>

         

         
        </section>

        <p className="text-xs text-gray-500 mt-8">
          Disclaimer: Do not use for diagnosis, treatment, or medication decisions without a qualified clinician.
        </p>
      </main>

      <Footer/>
     
    </div>
  );
}
