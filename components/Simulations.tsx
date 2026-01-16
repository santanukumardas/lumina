
import React from 'react';
import { SimulationProps, PlaceholderSim } from './simulations/Shared';
import { ApertureSim, ShutterSim, IsoSim, HistogramSim, MeteringSim, FocalLengthSim, SensorSizeSim, FocusPeakingSim, DynamicRangeSim } from './simulations/ExposureSims';
import { ThirdsSim, SymmetrySim, GoldenRatioSim, FramingSim, NegativeSpaceSim, BalanceSim, DutchAngleSim, KeystoningSim } from './simulations/CompositionSims';
import { LightingSim, ColorTempSim, ThreePointSim, GoldenHourSim, InverseSquareSim, GoboSim, FlashSyncSim } from './simulations/LightingSims';
import { LightPanelSim, ToneCurveSim, SplitToningSim, HslSim, ClaritySharpenSim, EffectsPanelSim, POST_PROD_DEFAULTS } from './simulations/PostProdSims';
import { ShowcaseViewer } from './simulations/Showcase';

export const Visualizer: React.FC<SimulationProps> = ({ lessonId, globalImage, setGlobalImage }) => {
  if (lessonId.startsWith('gal-')) {
      return <ShowcaseViewer id={lessonId} />;
  }

  // Props for post production tools that share image state
  // If globalImage is set (user uploaded), use it.
  // Otherwise, use the specific default for this lesson.
  const defaultImg = POST_PROD_DEFAULTS[lessonId] || 'https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?q=80&w=800&auto=format&fit=crop';
  const effectiveImage = globalImage || defaultImg;

  const ppProps = {
      image: effectiveImage,
      onUpload: setGlobalImage || (() => {})
  };

  switch (lessonId) {
    // Exposure
    case 'aperture': return <ApertureSim />;
    case 'shutter': return <ShutterSim />;
    case 'iso': return <IsoSim />;
    case 'histogram': return <HistogramSim />;
    case 'metering': return <MeteringSim />;
    case 'focal-length': return <FocalLengthSim />;
    case 'sensor-size': return <SensorSizeSim />;
    case 'focus-peaking': return <FocusPeakingSim />;
    case 'dynamic-range': return <DynamicRangeSim />;
    
    // Composition
    case 'thirds': return <ThirdsSim />;
    case 'symmetry': return <SymmetrySim />;
    case 'golden-ratio': return <GoldenRatioSim />;
    case 'framing': return <FramingSim />;
    case 'negative-space': return <NegativeSpaceSim />;
    case 'balance': return <BalanceSim />;
    case 'dutch-angle': return <DutchAngleSim />;
    case 'keystoning': return <KeystoningSim />;
    
    // Lighting
    case 'hard-soft': return <LightingSim />;
    case 'color-temp': return <ColorTempSim />;
    case 'three-point': return <ThreePointSim />;
    case 'golden-hour': return <GoldenHourSim />;
    case 'inverse-square': return <InverseSquareSim />;
    case 'gobos': return <GoboSim />;
    case 'flash-sync': return <FlashSyncSim />;
    
    // Post-Production
    case 'light-panel': return <LightPanelSim {...ppProps} />;
    case 'tone-curve': return <ToneCurveSim {...ppProps} />;
    case 'split-toning': return <SplitToningSim {...ppProps} />;
    case 'hsl-slider': return <HslSim {...ppProps} />;
    case 'clarity-sharpen': return <ClaritySharpenSim {...ppProps} />;
    case 'effects-panel': return <EffectsPanelSim {...ppProps} />;

    default: return <PlaceholderSim title="Concept" />;
  }
};
