import { useState } from 'react';
import { parseFields } from '@/components/form-builder/_component/aside/_component/json/json-fields';
import '@/components/form-builder/_component/aside/_component/json/FormJson.css';
import type { Field } from '@/components/form-builder/_component/field-builder/types';

type FormJsonProps = {
  fields: Field[];
  onImport: (fields: Field[]) => void;
};

export function FormJson({ fields, onImport }: FormJsonProps) {
  const [importText, setImportText] = useState('');
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);
  const exported = JSON.stringify({ fields }, null, 2);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(exported);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  }

  function handleImport() {
    const result = parseFields(importText);

    if ('error' in result) {
      setError(result.error);
      return;
    }

    onImport(result.fields);
    setImportText('');
    setError('');
  }

  return (
    <div className="form-json">
      <section className="form-json__section" aria-labelledby="json-export-heading">
        <div className="form-json__heading">
          <h2 id="json-export-heading">Export</h2>
          <button type="button" onClick={handleCopy}>
            {copied ? 'Copied' : 'Copy JSON'}
          </button>
        </div>
        <pre>{exported}</pre>
      </section>
      <section className="form-json__section" aria-labelledby="json-import-heading">
        <h2 id="json-import-heading">Import</h2>
        <textarea
          value={importText}
          aria-label="JSON to import"
          onChange={(event) => setImportText(event.target.value)}
        />
        {error ? <p className="form-json__error">{error}</p> : null}
        <button type="button" onClick={handleImport}>
          Import
        </button>
      </section>
    </div>
  );
}
