import { useEffect, useRef, useState } from 'react';
import mermaid from 'mermaid';

interface MermaidDiagramProps {
  chart: string;
  className?: string;
}

// Initialize mermaid with custom theme for dark mode
mermaid.initialize({
  startOnLoad: false,
  theme: 'dark',
  themeVariables: {
    primaryColor: '#1e1e2e',
    primaryTextColor: '#e0e0e0',
    primaryBorderColor: '#6366f1',
    lineColor: '#8b8ba8',
    secondaryColor: '#2a2a3e',
    tertiaryColor: '#3a3a4e',
    background: '#16161e',
    mainBkg: '#1e1e2e',
    secondBkg: '#2a2a3e',
    tertiaryBkg: '#3a3a4e',
    edgeLabelBackground: '#1e1e2e',
    clusterBkg: '#2a2a3e',
    clusterBorder: '#6366f1',
    defaultLinkColor: '#8b8ba8',
    titleColor: '#e0e0e0',
    nodeBorder: '#6366f1',
    actorBorder: '#6366f1',
    actorBkg: '#1e1e2e',
    actorTextColor: '#e0e0e0',
    actorLineColor: '#8b8ba8',
    signalColor: '#e0e0e0',
    signalTextColor: '#e0e0e0',
    labelBoxBkgColor: '#1e1e2e',
    labelBoxBorderColor: '#6366f1',
    labelTextColor: '#e0e0e0',
    loopTextColor: '#e0e0e0',
    noteBorderColor: '#6366f1',
    noteBkgColor: '#2a2a3e',
    noteTextColor: '#e0e0e0',
    activationBorderColor: '#6366f1',
    activationBkgColor: '#2a2a3e',
    sequenceNumberColor: '#e0e0e0',
  },
  flowchart: {
    useMaxWidth: false,
    htmlLabels: true,
    curve: 'basis',
    wrappingWidth: 200,
  },
});

export default function MermaidDiagram({ chart, className = '' }: MermaidDiagramProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [svg, setSvg] = useState<string>('');
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const renderDiagram = async () => {
      if (chart) {
        try {
          const id = `mermaid-${Math.random().toString(36).substr(2, 9)}`;
          const { svg } = await mermaid.render(id, chart);
          setSvg(svg);
        } catch (error) {
          console.error('Error rendering mermaid diagram:', error);
        }
      }
    };

    renderDiagram();
  }, [chart]);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStart({
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      setPosition({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y,
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    setIsDragging(true);
    setDragStart({
      x: touch.clientX - position.x,
      y: touch.clientY - position.y,
    });
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (isDragging) {
      const touch = e.touches[0];
      setPosition({
        x: touch.clientX - dragStart.x,
        y: touch.clientY - dragStart.y,
      });
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  return (
    <div
      ref={containerRef}
      className={className}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      style={{
        cursor: isDragging ? 'grabbing' : 'grab',
        userSelect: 'none',
      }}
    >
      <div
        style={{
          transform: `translate(${position.x}px, ${position.y}px)`,
          transition: isDragging ? 'none' : 'transform 0.1s ease',
        }}
        dangerouslySetInnerHTML={{ __html: svg }}
      />
    </div>
  );
}