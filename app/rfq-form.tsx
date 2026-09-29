'use client';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { Arrow } from './components';

type Field = { name: string; label: string; type?: string; options?: string[]; required?: boolean; placeholder?: string };
const buyer: Field[] = [{ name: 'fullName', label: 'Full name', required: true }, { name: 'company', label: 'Company name', required: true }, { name: 'website', label: 'Company website', type: 'url' }, { name: 'email', label: 'Business email', type: 'email', required: true }, { name: 'phone', label: 'Phone / WhatsApp' }, { name: 'country', label: 'Country', required: true }, { name: 'buyerType', label: 'Buyer type', options: ['Brand', 'Retailer', 'Wholesaler', 'Importer', 'Private Label', 'Promotional Apparel', 'Other'] }];
const product: Field[] = [{ name: 'category', label: 'Product category', options: ['Tops', 'Fleece', 'Women', 'Kids & Baby', 'Performance', 'Other'], required: true }, { name: 'description', label: 'Product description', type: 'textarea', required: true, placeholder: 'Garment type, construction, references…' }, { name: 'quantity', label: 'Estimated quantity' }, { name: 'styles', label: 'Number of styles' }, { name: 'quantityPerStyle', label: 'Quantity per style' }, { name: 'colors', label: 'Number of colors' }, { name: 'fabric', label: 'Fabric composition' }, { name: 'gsm', label: 'GSM' }, { name: 'sizes', label: 'Size range' }, { name: 'fit', label: 'Fit' }, { name: 'decoration', label: 'Decoration / printing / embroidery' }, { name: 'wash', label: 'Wash requirements' }, { name: 'labels', label: 'Label requirements' }, { name: 'packaging', label: 'Packaging requirements' }, { name: 'certification', label: 'Certification requirements' }];
const commercial: Field[] = [{ name: 'targetPrice', label: 'Target FOB price' }, { name: 'currency', label: 'Preferred currency', options: ['USD', 'EUR', 'GBP', 'AUD', 'CAD', 'INR', 'Other'] }, { name: 'moq', label: 'Expected MOQ' }, { name: 'destinationCountry', label: 'Destination country' }, { name: 'destinationPort', label: 'Destination port' }, { name: 'deliveryDate', label: 'Target delivery date', type: 'date' }, { name: 'annualVolume', label: 'Expected annual volume' }];
const steps = [{ title: 'About you', sub: 'Who we’ll be working with' }, { title: 'The product', sub: 'What you want made' }, { title: 'Commercials', sub: 'Price, volume and delivery' }, { title: 'Files & notes', sub: 'Tech packs and anything else' }];

function Fields({ fields }: { fields: Field[] }) {
  return (
    <div className="f-grid">
      {fields.map(f => (
        <div className={'f-field' + (f.type === 'textarea' ? ' wide' : '')} key={f.name}>
          {f.type === 'textarea' ? <textarea id={f.name} name={f.name} required={f.required} placeholder=" " />
            : f.options ? <select id={f.name} name={f.name} required={f.required} defaultValue=""><option value="" disabled={f.required}>Select…</option>{f.options.map(o => <option key={o}>{o}</option>)}</select>
            : <input id={f.name} name={f.name} type={f.type || 'text'} required={f.required} placeholder=" " />}
          <label htmlFor={f.name}>{f.label}{f.required && <b aria-hidden="true"> *</b>}</label>
          {f.placeholder && <span className="f-hint">{f.placeholder}</span>}
        </div>
      ))}
    </div>
  );
}

export function RfqForm({ visual }: { visual?: React.ReactNode }) {
  const [step, setStep] = useState(0);
  const [state, setState] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [files, setFiles] = useState<string[]>([]);
  const sets = useRef<(HTMLFieldSetElement | null)[]>([]);
  const top = useRef<HTMLDivElement>(null);

  // Pre-fill from "Request costing" links, e.g. /start-a-project?category=Tops&product=Polo%20shirt
  useEffect(() => {
    const q = new URLSearchParams(window.location.search);
    const category = document.getElementById('category') as HTMLSelectElement | null;
    const description = document.getElementById('description') as HTMLTextAreaElement | null;
    const cat = q.get('category'), product = q.get('product');
    if (category && cat && Array.from(category.options).some(o => o.value === cat)) category.value = cat;
    if (description && product && !description.value) description.value = `Product: ${product}
`;
  }, []);

  const firstInvalid = (i: number) => Array.from(sets.current[i]?.elements || []).find(el => 'checkValidity' in el && !(el as HTMLInputElement).checkValidity()) as HTMLInputElement | undefined;
  const go = (i: number) => { setStep(i); top.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }); };
  const next = () => {
    const bad = firstInvalid(step);
    if (bad) { bad.reportValidity(); return; }
    go(step + 1);
  };

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    for (let i = 0; i < steps.length; i++) {
      const bad = firstInvalid(i);
      if (bad) { setStep(i); setTimeout(() => bad.reportValidity(), 50); return; }
    }
    setState('sending');
    try {
      const form = e.currentTarget;
      const res = await fetch('/api/lead', { method: 'POST', body: new FormData(form) });
      if (!res.ok) throw new Error();
      form.reset();
      setFiles([]);
      setState('success');
    } catch {
      setState('error');
    }
  }

  return (
    <section className="rfq">
      <aside className="rfq-side">
        {visual && <div className="rfq-side-art art" aria-hidden="true">{visual}</div>}
        <div className="rfq-side-shade" />
        <div className="rfq-side-inner">
          <nav className="crumbs" aria-label="Breadcrumb"><Link href="/">Home</Link><span aria-hidden="true">—</span><span aria-current="page">Start a project</span></nav>
          <p className="kicker">Start a project / RFQ</p>
          <h1>Tell us what <em>you’re building.</em></h1>
          <p className="rfq-intro">Share as much detail as you have. We’ll review your requirement and follow up about suitable manufacturing options.</p>
          <ol className="rfq-steps">
            {steps.map((s, i) => (
              <li key={s.title} className={i === step ? 'is-active' : i < step ? 'is-done' : ''}>
                <button type="button" onClick={() => (i < step ? go(i) : undefined)} disabled={i > step || state === 'success'}>
                  <span className="rfq-dot">{i < step ? '✓' : String(i + 1).padStart(2, '0')}</span>
                  <span><strong>{s.title}</strong><small>{s.sub}</small></span>
                </button>
              </li>
            ))}
          </ol>
        </div>
      </aside>

      <div className="rfq-main" ref={top}>
        {state === 'success' ? (
          <div className="rfq-done">
            <span className="rfq-done-mark">✓</span>
            <h2>Brief <em>received.</em></h2>
            <p>Thank you. Our sourcing team will review your requirement and contact you regarding manufacturing options.</p>
            <Link className="pill pill-dark" href="/">Back to home <span className="pill-dot" /></Link>
          </div>
        ) : (
          <form onSubmit={submit} encType="multipart/form-data" noValidate>
            <div className="rfq-progress" aria-hidden="true"><span style={{ transform: `scaleX(${(step + 1) / steps.length})` }} /></div>
            <p className="rfq-count">Step {step + 1} of {steps.length}</p>

            <fieldset ref={el => { sets.current[0] = el; }} hidden={step !== 0} className="rfq-set">
              <legend>About <em>you.</em></legend>
              <Fields fields={buyer} />
            </fieldset>
            <fieldset ref={el => { sets.current[1] = el; }} hidden={step !== 1} className="rfq-set">
              <legend>The <em>product.</em></legend>
              <Fields fields={product} />
            </fieldset>
            <fieldset ref={el => { sets.current[2] = el; }} hidden={step !== 2} className="rfq-set">
              <legend>The <em>commercials.</em></legend>
              <Fields fields={commercial} />
            </fieldset>
            <fieldset ref={el => { sets.current[3] = el; }} hidden={step !== 3} className="rfq-set">
              <legend>Files &amp; <em>notes.</em></legend>
              <div className="f-grid">
                <label className="dropzone wide" htmlFor="files-input">
                  <input id="files-input" name="files" type="file" accept=".pdf,.xls,.xlsx,.jpg,.jpeg,.png,.webp,.zip" multiple onChange={e => setFiles(Array.from(e.target.files || []).map(f => f.name))} />
                  <span className="dropzone-icon" aria-hidden="true">+</span>
                  <strong>{files.length ? `${files.length} file${files.length > 1 ? 's' : ''} selected` : 'Add tech packs, references or specifications'}</strong>
                  <small>{files.length ? files.join(' · ') : 'PDF, Excel, images or ZIP · up to 10 MB each'}</small>
                </label>
                <div className="f-field wide">
                  <textarea id="comments" name="comments" placeholder=" " />
                  <label htmlFor="comments">Additional requirements</label>
                </div>
                <div hidden><label htmlFor="websiteConfirm">Leave blank</label><input id="websiteConfirm" name="websiteConfirm" tabIndex={-1} autoComplete="off" /></div>
              </div>
            </fieldset>

            <div className="rfq-nav">
              {step > 0 ? <button type="button" className="pill pill-outline" onClick={() => go(step - 1)}>Back</button> : <span />}
              {step < steps.length - 1
                ? <button type="button" className="pill pill-dark" onClick={next}>Continue <Arrow /></button>
                : <button type="submit" className="pill pill-sand" disabled={state === 'sending'}>{state === 'sending' ? 'Submitting…' : 'Submit sourcing brief'} <Arrow /></button>}
            </div>
            <p aria-live="polite" className="rfq-status">
              {state === 'error' && <span className="rfq-error">Your brief could not be submitted. Please try again.</span>}
            </p>
          </form>
        )}
      </div>
    </section>
  );
}
