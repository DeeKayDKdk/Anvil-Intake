import { useState } from "react";

const FOREST = "#1B3D2F";
const FOREST_PALE = "#f2f7f4";
const BORDER = "#ddd8ce";
const MUTED = "#777";
const RED = "#c0392b";
const AMBER = "#b8860b";

function Chip({ label, selected, onClick, multi }) {
  return (
    <button
      onClick={onClick}
      style={{
        padding: "10px 14px",
        border: `1.5px solid ${selected ? FOREST : BORDER}`,
        borderRadius: 20,
        fontSize: 13,
        fontWeight: 500,
        color: selected ? "#fff" : MUTED,
        background: selected ? FOREST : "#fff",
        cursor: "pointer",
        minHeight: 44,
        fontFamily: "inherit",
        margin: "0 4px 8px 0",
      }}
    >
      {label}
    </button>
  );
}

function TogBtn({ label, selected, onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        flex: 1,
        padding: "13px 8px",
        border: `1.5px solid ${selected ? FOREST : BORDER}`,
        borderRadius: 8,
        fontSize: 13,
        fontWeight: 600,
        color: selected ? FOREST : MUTED,
        background: selected ? FOREST_PALE : "#fff",
        cursor: "pointer",
        minHeight: 44,
        fontFamily: "inherit",
      }}
    >
      {label}
    </button>
  );
}

function Section({ num, title, children }) {
  return (
    <div style={{ margin: "12px 14px 0", background: "#fff", borderRadius: 10, border: `1px solid ${BORDER}`, overflow: "hidden" }}>
      <div style={{ background: FOREST_PALE, padding: "11px 14px", borderBottom: `1px solid ${BORDER}`, display: "flex", alignItems: "center", gap: 9 }}>
        <div style={{ background: FOREST, color: "#fff", fontSize: 10, width: 22, height: 22, borderRadius: 4, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontFamily: "monospace" }}>{num}</div>
        <div style={{ fontSize: 13, fontWeight: 700, color: FOREST }}>{title}</div>
      </div>
      <div style={{ padding: 14 }}>{children}</div>
    </div>
  );
}

function Field({ label, hint, children }) {
  return (
    <div style={{ marginBottom: 16 }}>
      <div style={{ fontSize: 12, fontWeight: 600, marginBottom: hint ? 4 : 6 }}>{label}</div>
      {hint && <div style={{ fontSize: 11, color: MUTED, marginBottom: 6, lineHeight: 1.4 }}>{hint}</div>}
      {children}
    </div>
  );
}

function ChipGroup({ options, selected, onToggle, multi }) {
  return (
    <div style={{ display: "flex", flexWrap: "wrap" }}>
      {options.map(opt => (
        <Chip
          key={opt}
          label={opt}
          selected={multi ? selected.includes(opt) : selected === opt}
          onClick={() => onToggle(opt)}
        />
      ))}
    </div>
  );
}

function TogGroup({ options, selected, onSelect }) {
  return (
    <div style={{ display: "flex", gap: 8 }}>
      {options.map(({ label, value }) => (
        <TogBtn key={value} label={label} selected={selected === value} onClick={() => onSelect(value)} />
      ))}
    </div>
  );
}

export default function App() {
  const [svc, setSvc] = useState(null);
  const [name, setName] = useState("");
  const [addr, setAddr] = useState("");
  const [nbhd, setNbhd] = useState(null);
  const [muni, setMuni] = useState(null);
  const [hoa, setHoa] = useState(null);
  const [referral, setReferral] = useState(null);
  const [sqft, setSqft] = useState("");
  const [bedCount, setBedCount] = useState(null);
  const [sun, setSun] = useState(null);
  const [slope, setSlope] = useState(null);
  const [drainage, setDrainage] = useState(null);
  const [groundcover, setGroundcover] = useState([]);
  const [keep, setKeep] = useState([]);
  const [irrigation, setIrrigation] = useState(null);
  const [irrCovers, setIrrCovers] = useState(null);
  const [access, setAccess] = useState(null);
  const [siteNotes, setSiteNotes] = useState("");
  const [style, setStyle] = useState(null);
  const [mulch, setMulch] = useState(null);
  const [irrAddon, setIrrAddon] = useState(null);
  const [color, setColor] = useState([]);
  const [wantNotes, setWantNotes] = useState("");
  const [dontNotes, setDontNotes] = useState("");
  const [boulders, setBoulders] = useState(null);
  const [hardscape, setHardscape] = useState([]);
  const [groundtype, setGroundtype] = useState(null);
  const [pkg, setPkg] = useState(null);
  const [budget, setBudget] = useState(null);
  const [timing, setTiming] = useState(null);
  const [decision, setDecision] = useState(null);
  const [rebates, setRebates] = useState([]);
  const [addons, setAddons] = useState([]);
  const [finalNotes, setFinalNotes] = useState("");
  const [output, setOutput] = useState(null);
  const [copied, setCopied] = useState(false);

  const toggleMulti = (arr, setArr, val) => {
    setArr(arr.includes(val) ? arr.filter(v => v !== val) : [...arr, val]);
  };
  const toggleRebate = (val) => toggleMulti(rebates, setRebates, val);
  const toggleAddon = (val) => toggleMulti(addons, setAddons, val);

  const timingWarn = timing === "June–August";

  const styleOptions = [
    { value: "modern", label: "Modern / Low-Maintenance", desc: "Clean lines, structural, minimal bloom clutter, rock mulch" },
    { value: "naturalistic", label: "Naturalistic / Pollinator", desc: "Meadow feel, long bloom, wildlife-friendly, wood mulch" },
    { value: "traditional", label: "Traditional / High-End", desc: "Tidy, colorful, classic curb appeal, wood mulch, steel edging" },
    { value: "native", label: "Native / Rock-Forward", desc: "Driest palette, boulders, rock mulch, rebate-optimized" },
  ];

  const styleMap = {
    modern: "Modern / Low-Maintenance (clean lines, structural, rock mulch)",
    naturalistic: "Naturalistic / Pollinator (meadow feel, long bloom, wood mulch)",
    traditional: "Traditional / High-End (tidy, colorful, wood mulch, steel edging)",
    native: "Native / Rock-Forward (driest palette, boulders, rock mulch, rebate-optimized)",
  };
  const pkgMap = {
    starter: "Starter (~500 sq ft · $3,500–5,500)",
    standard: "Standard (~1,000 sq ft · $7,000–10,000)",
    premium: "Premium (~1,500+ sq ft · $12,000–18,000)",
  };
  const rebMap = {
    aurora: "Aurora GRIP (up to $4,000 — active)",
    castlerock: "Castle Rock ($3.25/sq ft — active)",
    fortcollins: "Fort Collins (up to $1,000 — active)",
    denverwater: "Denver Water (fully allocated 2026 — do NOT promise)",
  };

  const generate = () => {
    const svcLabel = svc === "bed" ? "Flower Bed Install" : "Full Xeriscape Transformation";
    let p = `ANVIL LANDSCAPE CO. — SITE INTAKE DATA
========================================
Run the Anvil Proposal Engine on the uploaded photos using the following confirmed site data.

SERVICE TYPE: ${svcLabel}

CLIENT
------
Name: ${name || "Not provided"}
Address: ${addr || "Not provided"}
Neighborhood: ${nbhd || "Not specified"}
Municipality: ${muni || "Not specified"}
HOA: ${hoa || "Not specified"}
How They Found Anvil: ${referral || "Not specified"}

SITE MEASUREMENTS
-----------------
Total Sq Ft: ${sqft || "Not measured"}${svc === "bed" ? `\nNumber of Beds: ${bedCount || "Not specified"}` : ""}
Sun Exposure: ${sun || "Not specified"}
Slope: ${slope || "Not specified"}
Drainage: ${drainage || "Not specified"}
Equipment Access: ${access || "Not specified"}

EXISTING CONDITIONS
-------------------
Current Ground Cover: ${groundcover.length ? groundcover.join(", ") : "Not specified"}
Features to Keep: ${keep.length ? keep.join(", ") : "None specified"}
Existing Irrigation: ${irrigation || "Not specified"}${irrigation === "yes" ? `\nIrrigation Covers New Area: ${irrCovers || "Not specified"}` : ""}
Site Notes: ${siteNotes || "None"}

DESIGN PREFERENCES
------------------
Style Direction: ${style ? styleMap[style] : "Not specified"}
Mulch Preference: ${mulch || "Not specified"}
Irrigation Add-On: ${irrAddon || "Not specified"}
Color Preference: ${color.length ? color.join(", ") : "No preference"}
Client Wants: ${wantNotes || "None"}
Client Does NOT Want: ${dontNotes || "None"}`;

    if (svc === "xeriscape") {
      p += `

XERISCAPE ZONES
---------------
Boulder Accents: ${boulders || "Not specified"}
Hardscape: ${hardscape.length ? hardscape.join(", ") : "None"}
Ground Cover Type: ${groundtype || "Not specified"}
Package Tier: ${pkg ? pkgMap[pkg] : "Not specified"}`;
    }

    p += `

BUDGET + TIMELINE
-----------------
Budget Range: ${budget || "Not specified"}
Desired Start: ${timing || "Not specified"}
Decision Timeline: ${decision || "Not specified"}

REBATE ELIGIBILITY
------------------
${rebates.length ? rebates.map(r => "• " + rebMap[r]).join("\n") : "• No rebates identified"}

ADD-ONS TO DISCUSS
------------------
${addons.length ? addons.map(a => "• " + a).join("\n") : "• None flagged"}

ADDITIONAL CONTEXT
------------------
${finalNotes || "None"}

========================================
INSTRUCTIONS FOR THE PROPOSAL ENGINE:
Use the confirmed measurements and preferences above — do NOT override them with photo estimates. Only use plants from the Anvil Plant Library. Generate the full proposal including: property analysis, recommended design, plant list with costs, materials breakdown, total estimate, rebate note, add-on recommendations, installation timeline, Year 1 care guide, annual maintenance proposal, 5-year client value, and render prompt for mockup image.`;

    setOutput(p);
    setTimeout(() => document.getElementById("output-section")?.scrollIntoView({ behavior: "smooth" }), 100);
  };

  const doCopy = () => {
    navigator.clipboard.writeText(output).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const reset = () => {
    setSvc(null); setName(""); setAddr(""); setNbhd(null); setMuni(null);
    setHoa(null); setReferral(null); setSqft(""); setBedCount(null);
    setSun(null); setSlope(null); setDrainage(null); setGroundcover([]);
    setKeep([]); setIrrigation(null); setIrrCovers(null); setAccess(null);
    setSiteNotes(""); setStyle(null); setMulch(null); setIrrAddon(null);
    setColor([]); setWantNotes(""); setDontNotes(""); setBoulders(null);
    setHardscape([]); setGroundtype(null); setPkg(null); setBudget(null);
    setTiming(null); setDecision(null); setRebates([]); setAddons([]);
    setFinalNotes(""); setOutput(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const inp = { width: "100%", padding: "12px 14px", border: `1.5px solid ${BORDER}`, borderRadius: 8, fontSize: 15, fontFamily: "inherit", outline: "none", background: "#fff" };
  const ta = { ...inp, resize: "none", lineHeight: 1.5 };

  return (
    <div style={{ fontFamily: "'DM Sans', Helvetica, Arial, sans-serif", background: "#f5f3ef", minHeight: "100vh", paddingBottom: 60, fontSize: 14 }}>

      {/* HEADER */}
      <div style={{ background: FOREST, padding: "14px 18px", position: "sticky", top: 0, zIndex: 100 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <div style={{ fontFamily: "monospace", fontSize: 9, letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(255,255,255,0.45)" }}>Anvil Landscape Co.</div>
            <div style={{ fontSize: 17, fontWeight: 700, color: "#fff", marginTop: 2 }}>Site Intake Form</div>
          </div>
          <div style={{ fontFamily: "monospace", fontSize: 9, color: "rgba(255,255,255,0.3)" }}>v2.0</div>
        </div>
      </div>

      {/* ALERTS */}
      <div style={{ margin: "12px 14px 0", background: "#fff8ee", border: `1.5px solid #e0a020`, borderRadius: 8, padding: "12px 14px", display: "flex", gap: 10 }}>
        <div style={{ fontSize: 18, flexShrink: 0 }}>⚠️</div>
        <div>
          <div style={{ fontSize: 12, fontWeight: 700, color: "#7a5000", marginBottom: 3 }}>Before Every Job — Call 811</div>
          <div style={{ fontSize: 11, color: "#7a5000", lineHeight: 1.5 }}>Required in Colorado before any digging. 3 business days ahead. <strong>call811.com</strong> or <strong>811</strong></div>
        </div>
      </div>
      <div style={{ margin: "10px 14px 0", background: FOREST_PALE, border: `1.5px solid #b8d4c2`, borderRadius: 8, padding: "12px 14px", display: "flex", gap: 10 }}>
        <div style={{ fontSize: 18, flexShrink: 0 }}>📸</div>
        <div>
          <div style={{ fontSize: 12, fontWeight: 700, color: FOREST, marginBottom: 3 }}>Take Photos Before You Leave</div>
          <div style={{ fontSize: 11, color: "#3a5a40", lineHeight: 1.5 }}>Full yard, each bed area, sun exposure, architecture, existing features. Upload alongside this prompt in ChatGPT.</div>
        </div>
      </div>

      {/* 1. SERVICE */}
      <Section num="1" title="Service Type">
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
          {[{ id: "bed", icon: "🌿", name: "Flower Bed Install", desc: "Planting, edging, mulch. Lawn stays." },
            { id: "xeriscape", icon: "🪨", name: "Full Xeriscape", desc: "Complete turf removal and redesign." }].map(s => (
            <button key={s.id} onClick={() => setSvc(s.id)} style={{
              border: `1.5px solid ${svc === s.id ? FOREST : BORDER}`,
              borderRadius: 10, padding: 14, background: svc === s.id ? FOREST_PALE : "#fff",
              cursor: "pointer", textAlign: "left", minHeight: 90, fontFamily: "inherit", width: "100%"
            }}>
              <span style={{ fontSize: 22, display: "block", marginBottom: 6 }}>{s.icon}</span>
              <span style={{ fontSize: 13, fontWeight: 700, color: svc === s.id ? FOREST : "#1a1a1a", display: "block", marginBottom: 2 }}>{s.name}</span>
              <span style={{ fontSize: 11, color: MUTED, display: "block", lineHeight: 1.4 }}>{s.desc}</span>
            </button>
          ))}
        </div>
      </Section>

      {/* 2. CLIENT */}
      <Section num="2" title="Client Info">
        <Field label="Client Name"><input style={inp} value={name} onChange={e => setName(e.target.value)} placeholder="First Last" /></Field>
        <Field label="Address"><input style={inp} value={addr} onChange={e => setAddr(e.target.value)} placeholder="123 Main St, Denver CO" /></Field>
        <Field label="Neighborhood">
          <ChipGroup options={["Wash Park","Highlands","Platt Park","Park Hill","Capitol Hill","RiNo","Baker","Other"]} selected={nbhd} onToggle={setNbhd} />
        </Field>
        <Field label="Municipality">
          <ChipGroup options={["Denver","Aurora","Castle Rock","Fort Collins","Other"]} selected={muni} onToggle={setMuni} />
        </Field>
        <Field label="HOA">
          <div style={{ display: "flex", gap: 8 }}>
            {[["Yes","yes"],["No","no"],["Unknown","unknown"]].map(([l,v]) => <TogBtn key={v} label={l} selected={hoa===v} onClick={() => setHoa(v)} />)}
          </div>
        </Field>
        <Field label="How Did They Find Anvil?">
          <ChipGroup options={["Referral","Google","Nextdoor","Instagram","Saw a job site","anvillandscape.com","Other"]} selected={referral} onToggle={setReferral} />
        </Field>
      </Section>

      {/* 3. MEASUREMENTS */}
      <Section num="3" title="Site Measurements">
        <Field label="Estimated Total Sq Ft" hint="Measure length × width. Estimate by zones for irregular shapes.">
          <input style={inp} type="number" value={sqft} onChange={e => setSqft(e.target.value)} placeholder="e.g. 450" />
        </Field>
        {svc === "bed" && (
          <Field label="Number of Beds">
            <ChipGroup options={["1","2","3","4+"]} selected={bedCount} onToggle={setBedCount} />
          </Field>
        )}
        <Field label="Sun Exposure">
          <ChipGroup options={["Full Sun","Part Shade","Mixed"]} selected={sun} onToggle={setSun} />
        </Field>
        <Field label="Slope">
          <ChipGroup options={["Flat","Gentle slope","Steep slope"]} selected={slope} onToggle={setSlope} />
        </Field>
        <Field label="Drainage">
          <ChipGroup options={["Good","Pools in spots","Poor overall"]} selected={drainage} onToggle={setDrainage} />
        </Field>
      </Section>

      {/* 4. CONDITIONS */}
      <Section num="4" title="Existing Conditions">
        <Field label="Current Ground Cover">
          <div style={{ display: "flex", flexWrap: "wrap" }}>
            {["Lawn / turf","Weeds","Bare soil","Existing beds","Rock / DG","Mixed"].map(o => (
              <Chip key={o} label={o} selected={groundcover.includes(o)} onClick={() => toggleMulti(groundcover, setGroundcover, o)} multi />
            ))}
          </div>
        </Field>
        <Field label="Existing Features to Keep">
          <div style={{ display: "flex", flexWrap: "wrap" }}>
            {["Trees","Shrubs","Irrigation","Path / patio","Lighting","None"].map(o => (
              <Chip key={o} label={o} selected={keep.includes(o)} onClick={() => toggleMulti(keep, setKeep, o)} multi />
            ))}
          </div>
        </Field>
        <Field label="Existing Irrigation">
          <div style={{ display: "flex", gap: 8 }}>
            {[["Yes","yes"],["No","no"],["Unknown","unknown"]].map(([l,v]) => (
              <TogBtn key={v} label={l} selected={irrigation===v} onClick={() => { setIrrigation(v); if(v !== "yes") setIrrCovers(null); }} />
            ))}
          </div>
          {irrigation === "yes" && (
            <div style={{ marginTop: 10 }}>
              <div style={{ fontSize: 12, fontWeight: 600, marginBottom: 6 }}>Does It Cover the New Area?</div>
              <div style={{ display: "flex", gap: 8 }}>
                {[["Yes — full","yes"],["Partial","partial"],["No","no"]].map(([l,v]) => (
                  <TogBtn key={v} label={l} selected={irrCovers===v} onClick={() => setIrrCovers(v)} />
                ))}
              </div>
            </div>
          )}
        </Field>
        <Field label="Equipment Access">
          <ChipGroup options={["Full access","Gate access","Hand tools only"]} selected={access} onToggle={setAccess} />
        </Field>
        <Field label="Additional Notes on Site">
          <textarea style={ta} rows={3} value={siteNotes} onChange={e => setSiteNotes(e.target.value)} placeholder="Utilities, obstacles, neighbor issues, anything unusual..." />
        </Field>
      </Section>

      {/* 5. DESIGN */}
      <Section num="5" title="Design Preferences">
        <Field label="Style Direction" hint="Pick the vibe that fits the client.">
          {styleOptions.map(s => (
            <button key={s.value} onClick={() => setStyle(s.value)} style={{
              width: "100%", padding: "12px 14px", border: `1.5px solid ${style===s.value ? FOREST : BORDER}`,
              borderRadius: 8, background: style===s.value ? FOREST_PALE : "#fff", cursor: "pointer",
              textAlign: "left", minHeight: 56, fontFamily: "inherit", marginBottom: 8, display: "block"
            }}>
              <span style={{ fontSize: 13, fontWeight: 700, color: style===s.value ? FOREST : "#1a1a1a", display: "block" }}>{s.label}</span>
              <span style={{ fontSize: 11, color: MUTED, display: "block", marginTop: 2 }}>{s.desc}</span>
            </button>
          ))}
        </Field>
        <Field label="Mulch Preference">
          <ChipGroup options={["Wood / cedar","Rock / DG","Mixed","Client decides"]} selected={mulch} onToggle={setMulch} />
        </Field>
        <Field label="Irrigation Add-On">
          <div style={{ display: "flex", gap: 8 }}>
            {[["Yes","yes"],["No","no"],["Discuss","maybe"]].map(([l,v]) => <TogBtn key={v} label={l} selected={irrAddon===v} onClick={() => setIrrAddon(v)} />)}
          </div>
        </Field>
        <Field label="Color Preference">
          <div style={{ display: "flex", flexWrap: "wrap" }}>
            {["Purple / blue","Yellow / gold","Red / orange","White / silver","Mixed / all","No preference"].map(o => (
              <Chip key={o} label={o} selected={color.includes(o)} onClick={() => toggleMulti(color, setColor, o)} multi />
            ))}
          </div>
        </Field>
        <Field label="Anything They Definitely Want">
          <textarea style={ta} rows={2} value={wantNotes} onChange={e => setWantNotes(e.target.value)} placeholder="Specific plants, features, elements they mentioned..." />
        </Field>
        <Field label="Anything They Definitely Don't Want">
          <textarea style={ta} rows={2} value={dontNotes} onChange={e => setDontNotes(e.target.value)} placeholder="Plants they hate, colors to avoid, features they dislike..." />
        </Field>
      </Section>

      {/* 6. XERISCAPE ZONES */}
      {svc === "xeriscape" && (
        <Section num="6" title="Xeriscape Zones">
          <Field label="Boulder Accents">
            <div style={{ display: "flex", gap: 8 }}>
              {[["Yes","yes"],["No","no"],["Discuss","maybe"]].map(([l,v]) => <TogBtn key={v} label={l} selected={boulders===v} onClick={() => setBoulders(v)} />)}
            </div>
          </Field>
          <Field label="Hardscape">
            <div style={{ display: "flex", flexWrap: "wrap" }}>
              {["Flagstone path","DG patio","Stepping stones","None"].map(o => (
                <Chip key={o} label={o} selected={hardscape.includes(o)} onClick={() => toggleMulti(hardscape, setHardscape, o)} multi />
              ))}
            </div>
          </Field>
          <Field label="Ground Cover Type">
            <ChipGroup options={["Decomposed granite","River rock","Mixed","Client decides"]} selected={groundtype} onToggle={setGroundtype} />
          </Field>
          <Field label="Package Tier">
            {[["starter","Starter — ~500 sq ft · $3,500–5,500"],["standard","Standard — ~1,000 sq ft · $7,000–10,000"],["premium","Premium — ~1,500+ sq ft · $12,000–18,000"]].map(([v,l]) => (
              <button key={v} onClick={() => setPkg(v)} style={{
                width: "100%", padding: "12px 14px", border: `1.5px solid ${pkg===v ? FOREST : BORDER}`,
                borderRadius: 8, background: pkg===v ? FOREST_PALE : "#fff", cursor: "pointer",
                textAlign: "left", fontFamily: "inherit", marginBottom: 8, fontSize: 13,
                fontWeight: 600, color: pkg===v ? FOREST : MUTED, display: "block"
              }}>{l}</button>
            ))}
          </Field>
        </Section>
      )}

      {/* BUDGET */}
      <Section num={svc === "xeriscape" ? "7" : "6"} title="Budget + Timeline">
        <Field label="Budget Range">
          <ChipGroup options={["Under $2,000","$2,000–5,000","$5,000–10,000","$10,000–18,000","$18,000+","Flexible"]} selected={budget} onToggle={setBudget} />
        </Field>
        <Field label="Desired Start Window">
          <div style={{ display: "flex", flexWrap: "wrap" }}>
            {["ASAP","April–May","June–August","September–October","Next spring","Flexible"].map(o => (
              <Chip key={o} label={o} selected={timing===o} onClick={() => setTiming(o)} />
            ))}
          </div>
          {timingWarn && (
            <div style={{ marginTop: 8, background: "#fdf4f3", borderLeft: `3px solid ${RED}`, borderRadius: "0 6px 6px 0", padding: "10px 12px", fontSize: 11.5, color: "#7a1a10", lineHeight: 1.5 }}>
              ⚠️ <strong>July is a hard no.</strong> June and August possible but watering doubles. Price accordingly.
            </div>
          )}
        </Field>
        <Field label="Decision Timeline">
          <ChipGroup options={["Ready now","Within 2 weeks","1–2 months","Just exploring"]} selected={decision} onToggle={setDecision} />
        </Field>
      </Section>

      {/* REBATES */}
      <Section num={svc === "xeriscape" ? "8" : "7"} title="Rebate Eligibility">
        <div style={{ background: "#fdf8ee", borderLeft: `3px solid ${AMBER}`, borderRadius: "0 6px 6px 0", padding: "10px 12px", marginBottom: 12, fontSize: 12, color: "#5a4010", lineHeight: 1.5 }}>
          Denver Water fully allocated 2026 — do not promise. Aurora GRIP is strongest active rebate.
        </div>
        {[["aurora","Aurora GRIP","Up to $4,000 · Active"],["castlerock","Castle Rock","$3.25/sq ft · Active"],["fortcollins","Fort Collins","Up to $1,000 · Active"],["denverwater","Denver Water","Fully allocated 2026 — do not promise"]].map(([v,n,a]) => (
          <button key={v} onClick={() => toggleRebate(v)} style={{
            width: "100%", display: "flex", alignItems: "center", gap: 12, padding: "10px 12px",
            border: `1.5px solid ${rebates.includes(v) ? FOREST : BORDER}`, borderRadius: 8,
            background: rebates.includes(v) ? FOREST_PALE : "#fff", cursor: "pointer",
            fontFamily: "inherit", textAlign: "left", marginBottom: 8, minHeight: 52
          }}>
            <div style={{ width: 20, height: 20, border: `2px solid ${rebates.includes(v) ? FOREST : BORDER}`, borderRadius: 4, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, background: rebates.includes(v) ? FOREST : "transparent", color: rebates.includes(v) ? "#fff" : "transparent" }}>✓</div>
            <div>
              <span style={{ fontSize: 13, fontWeight: 600, display: "block" }}>{n}</span>
              <span style={{ fontSize: 11, color: FOREST, fontWeight: 600, display: "block" }}>{a}</span>
            </div>
          </button>
        ))}
      </Section>

      {/* ADD-ONS */}
      <Section num={svc === "xeriscape" ? "9" : "8"} title="Add-Ons to Discuss">
        <div style={{ display: "flex", flexWrap: "wrap" }}>
          {["Drip irrigation","Smart controller","Landscape lighting","Annual maintenance","Flagstone path","DG patio","Snow removal"].map(o => (
            <Chip key={o} label={o} selected={addons.includes(o)} onClick={() => toggleAddon(o)} multi />
          ))}
        </div>
      </Section>

      {/* FINAL NOTES */}
      <Section num={svc === "xeriscape" ? "10" : "9"} title="Final Notes">
        <Field label="Any Other Context for the Proposal">
          <textarea style={ta} rows={4} value={finalNotes} onChange={e => setFinalNotes(e.target.value)} placeholder="HOA restrictions, neighbor considerations, client personality, anything the GPT should know..." />
        </Field>
      </Section>

      {/* BUTTONS */}
      <div style={{ margin: "16px 14px 0" }}>
        <button onClick={generate} style={{ width: "100%", background: FOREST, color: "#fff", border: "none", borderRadius: 10, padding: 16, fontSize: 16, fontWeight: 700, cursor: "pointer", minHeight: 52, fontFamily: "inherit" }}>
          Generate GPT Prompt →
        </button>
        <button onClick={reset} style={{ width: "100%", marginTop: 10, background: "none", border: `1.5px solid ${BORDER}`, borderRadius: 10, padding: 13, fontSize: 14, fontWeight: 600, color: MUTED, cursor: "pointer", minHeight: 48, fontFamily: "inherit" }}>
          Reset Form
        </button>
      </div>

      {/* OUTPUT */}
      {output && (
        <div id="output-section" style={{ margin: "14px 14px 0" }}>
          <div style={{ background: "#1B3D2F", color: "#fff", padding: "12px 14px", borderRadius: "10px 10px 0 0", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontSize: 13, fontWeight: 700 }}>GPT Prompt — Copy This</span>
            <button onClick={doCopy} style={{ background: "rgba(255,255,255,0.15)", border: "1px solid rgba(255,255,255,0.3)", color: "#fff", padding: "7px 14px", borderRadius: 6, fontSize: 12, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}>
              {copied ? "Copied ✓" : "Copy"}
            </button>
          </div>
          <div style={{ background: "#1a1a1a", color: "#e8e8e8", padding: 14, fontFamily: "monospace", fontSize: 11, lineHeight: 1.7, borderRadius: "0 0 10px 10px", whiteSpace: "pre-wrap", wordBreak: "break-word" }}>
            {output}
          </div>
          <div style={{ background: FOREST_PALE, border: `1px solid #b8d4c2`, borderRadius: 10, padding: 14, marginTop: 12 }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: FOREST, marginBottom: 8 }}>Next Steps</div>
            {["Copy the prompt above","Open your Anvil Proposal Engine GPT in ChatGPT","Upload all yard photos from the site walk","Paste the prompt into the message field","Send: \"Run the Anvil [Flower Bed / Xeriscape] Engine on these photos.\"","Copy the render prompt → paste into DALL-E for the mockup image"].map((s,i) => (
              <div key={i} style={{ fontSize: 12, color: "#333", padding: "4px 0 4px 18px", position: "relative", lineHeight: 1.5 }}>
                <span style={{ position: "absolute", left: 0, color: FOREST, fontWeight: 700 }}>{i+1}.</span>{s}
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}
