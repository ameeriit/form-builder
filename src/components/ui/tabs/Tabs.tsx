import { type ReactNode, useState } from 'react';
import '@/components/ui/tabs/Tabs.css';

type TabItem = {
  id: string;
  label: string;
  content: ReactNode;
};

type TabsProps = {
  label: string;
  tabs: TabItem[];
};

export function Tabs({ label, tabs }: TabsProps) {
  const [selectedId, setSelectedId] = useState(tabs[0]?.id);
  const selected = tabs.find((tab) => tab.id === selectedId) ?? tabs[0];

  return (
    <div className="tabs">
      <div className="tabs__list" role="tablist" aria-label={label}>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            role="tab"
            aria-selected={tab.id === selected?.id}
            onClick={() => setSelectedId(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div role="tabpanel">{selected?.content}</div>
    </div>
  );
}
