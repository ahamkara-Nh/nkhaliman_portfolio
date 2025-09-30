import React, { useEffect, useRef, useState } from 'react';
import mermaid from 'mermaid';

interface MermaidDiagramProps {
  chartCode: string;
  className?: string;
}

const MermaidDiagram: React.FC<MermaidDiagramProps> = ({ chartCode, className }) => {
  const [svgCode, setSvgCode] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const svgContainerRef = useRef<HTMLDivElement>(null);
  const [dragging, setDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [startY, setStartY] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [scrollTop, setScrollTop] = useState(0);
  const idRef = useRef<string>(`mermaid-${Math.random().toString(36).substr(2, 9)}`);

  // Initialize mermaid once
  useEffect(() => {
    mermaid.initialize({
      startOnLoad: false,
      theme: 'dark',
      securityLevel: 'loose',
      flowchart: {
        useMaxWidth: false,
        htmlLabels: true,
        curve: 'basis'
      },
      fontFamily: 'inherit',
      themeCSS: `
        .node rect,
        .node circle,
        .node polygon,
        .node path {
          stroke: #8a8a8a;
          fill: #2d2d2d;
        }
        .node .label text {
          fill: #ffffff;
          font-family: inherit;
        }
        .edgePath path {
          stroke: #666;
        }
        .cluster rect {
          stroke: #555;
          fill: #1e1e1e;
        }
        .cluster text {
          fill: #ffffff;
        }
      `
    });
  }, []);

  // Render the diagram
  useEffect(() => {
    const renderDiagram = async () => {
      try {
        setLoading(true);
        setError(null);

        // Generate the diagram with unique ID
        const { svg } = await mermaid.render(idRef.current, chartCode);
        setSvgCode(svg);
        setLoading(false);
      } catch (err) {
        console.error('Error rendering mermaid diagram:', err);
        setError('Failed to render diagram: ' + (err as Error).message);
        setLoading(false);
      }
    };

    renderDiagram();
  }, [chartCode]);

  // Mouse events for dragging
  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.button !== 0) return; // Only left mouse button
    
    setDragging(true);
    setStartX(e.pageX - (containerRef.current?.offsetLeft || 0));
    setStartY(e.pageY - (containerRef.current?.offsetTop || 0));
    setScrollLeft(containerRef.current?.scrollLeft || 0);
    setScrollTop(containerRef.current?.scrollTop || 0);
    e.preventDefault(); // Prevent text selection
  };

  const handleMouseUp = () => {
    setDragging(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!dragging || !containerRef.current) return;
    
    const x = e.pageX - (containerRef.current?.offsetLeft || 0);
    const y = e.pageY - (containerRef.current?.offsetTop || 0);
    const walkX = (x - startX) * 2; // Multiply by 2 for more sensitivity
    const walkY = (y - startY) * 2; // Multiply by 2 for more sensitivity
    
    containerRef.current.scrollLeft = scrollLeft - walkX;
    containerRef.current.scrollTop = scrollTop - walkY;
  };

  return (
    <div
      className={`mermaid-diagram-container ${className || ''}`}
      ref={containerRef}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      style={{
        overflow: 'auto',
        height: '500px',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        borderRadius: '8px',
        background: 'rgba(0, 0, 0, 0.1)',
        padding: '20px',
        userSelect: dragging ? 'none' : 'auto',
        cursor: dragging ? 'grabbing' : 'grab'
      }}
    >
      {loading && (
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100%',
          color: '#ffffff'
        }}>
          Loading diagram...
        </div>
      )}
      {error && (
        <div style={{
          color: '#ff6b6b',
          padding: '20px',
          textAlign: 'center'
        }}>
          {error}
        </div>
      )}
      {!loading && !error && svgCode && (
        <div
          ref={svgContainerRef}
          style={{
            minWidth: '800px',
            minHeight: '600px',
            padding: '20px'
          }}
          dangerouslySetInnerHTML={{ __html: svgCode }}
        />
      )}
    </div>
  );
};

export default MermaidDiagram;