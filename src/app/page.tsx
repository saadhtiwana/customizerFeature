'use client';
import { useState } from 'react';
import Canvas from './components/Canvas';
import { fabricRegistry, fabricsByCategory } from '@/lib/fabric-config';

export default function Home() {
  const [selectedFabric, setSelectedFabric] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('jacket');
  const [activeSubOption, setActiveSubOption] = useState(null);
  const [previewOption, setPreviewOption] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState({
    // Jacket
    closure: 'S1-J',
    lapel: 'S1-NOTCH-J',
    sleeve: 'Sleeve',
    breastPocket: 'B-BOAT-J',
    hipPocket: 'H-FLAP-J',
    monogram: 'none',
    // Waistcoat
    waistcoatClosure: 'S4-W',
    waistcoatPocket: 'JETTED-W',
    waistcoatVShape: 'S4-NOTCH-W',
    // Trouser
    waistband: 'STANDARD',
    pleat: 'NONE'
  });

  // Get fabric category from selected fabric ID
  const getFabricCategory = () => {
    const fabric = fabricRegistry.find(f => f.id === selectedFabric);
    return fabric?.category || '70';
  };

  // Build dynamic asset path based on selected fabric
  const getAssetPath = (garment: string, category: string, filename: string) => {
    if (!selectedFabric) return '';
    const fabricCategory = getFabricCategory();
    return `/assets/${fabricCategory}/${selectedFabric}/${garment}/${category}/${filename}`;
  };

  const jacketOptions = {
    closure: {
      'S1-J': { name: 'Single Button', filename: 'S1-J.png' },
      'S2-J': { name: 'Double Button', filename: 'S2-J.png' },
      'D4-J': { name: '4 Button Double Breasted', filename: 'D4-J.png' },
      'D6-J': { name: '6 Button Double Breasted', filename: 'D6-J.png' }
    },
    lapel: {
      'D-PEAK-J': { name: 'D Peak', filename: 'D-PEAK-J.png' },
      'S1-CONCAVE-J': { name: 'S1 Concave', filename: 'S1-CONCAVE-J.png' },
      'S1-NOTCH-J': { name: 'S1 Notch', filename: 'S1-NOTCH-J.png' },
      'S1-PEAK-J': { name: 'S1 Peak', filename: 'S1-PEAK-J.png' },
      'S2-CONCAVE-J': { name: 'S2 Concave', filename: 'S2-CONCAVE-J.png' },
      'S2-NOTCH-J': { name: 'S2 Notch', filename: 'S2-NOTCH-J.png' },
      'S2-PEAK-J': { name: 'S2 Peak', filename: 'S2-PEAK-J.png' }
    },
    sleeve: {
      'Sleeve': { name: 'Standard Sleeve', filename: 'Sleeve.png' },
      'none': { name: 'No Sleeves', filename: '' }
    },
    breastPocket: {
      'B-BOAT-J': { name: 'Breast Boat Pocket', filename: 'B-BOAT-J.png', subfolder: 'Breast Pocket/' },
      'B-PATCH-J': { name: 'Breast Patch Pocket', filename: 'B-PATCH-J.png', subfolder: 'Breast Pocket/' },
      'none': { name: 'No Breast Pocket', filename: '' }
    },
    hipPocket: {
      'H-FLAP-J': { name: 'Hip Flap Pocket', filename: 'H-FLAP-J.png', subfolder: 'Hip Pocket/' },
      'H-JETTED-J': { name: 'Hip Jetted Pocket', filename: 'H-JETTED-J.png', subfolder: 'Hip Pocket/' },
      'H-PATCH-J': { name: 'Hip Patch Pocket', filename: 'H-PATCH-J.png', subfolder: 'Hip Pocket/' },
      'none': { name: 'No Hip Pockets', filename: '' }
    },
    monogram: {
      'none': { name: 'No Monogram', filename: '' }
    }
  };

  const waistcoatOptions = {
    waistcoatClosure: {
      'D6-W': { name: 'D6 Waistcoat', filename: 'D6-W.png' },
      'D8-W': { name: 'D8 Waistcoat', filename: 'D8-W.png' },
      'S4-W': { name: 'S4 Waistcoat', filename: 'S4-W.png' },
      'S5-W': { name: 'S5 Waistcoat', filename: 'S5-W.png' }
    },
    waistcoatPocket: {
      'JETTED-W': { name: 'Jetted Pocket', filename: 'JETTED-W.png' },
      'WELT-W': { name: 'Welt Pocket', filename: 'WELT-W.png' },
      'none': { name: 'No Pocket', filename: '' }
    },
    waistcoatVShape: {
      'D-NOTCH-W': { name: 'D Notch V-Shape', filename: 'D-NOTCH-W.png' },
      'D-PEAK-W': { name: 'D Peak V-Shape', filename: 'D-PEAK-W.png' },
      'S4-NOTCH-W': { name: 'S4 Notch V-Shape', filename: 'S4-NOTCH-W.png' },
      'S5-NOTCH-W': { name: 'S5 Notch V-Shape', filename: 'S5-NOTCH-W.png' }
    }
  };

  const trouserOptions = {
    waistband: {
      'DOUBLE-SIDED': { name: 'Double Sided', filename: 'DOUBLE-SIDED.png' },
      'EXTENDED': { name: 'Extended', filename: 'EXTENDED.png' },
      'STANDARD': { name: 'Standard', filename: 'STANDARD.png' }
    },
    pleat: {
      'DOUBLE-P': { name: 'Double Pleat', filename: 'DOUBLE-P.png' },
      'NONE': { name: 'No Pleat', filename: 'NONE.png' },
      'SINGLE-P': { name: 'Single Pleat', filename: 'SINGLE-P.png' }
    }
  };

  const getCurrentOption = (category: string) => {
    if (activeSubOption === category && previewOption) {
      return previewOption;
    }
    return selectedOptions[category];
  };

  const getCurrentOptions = () => {
    if (activeTab === 'jacket') return jacketOptions;
    if (activeTab === 'waistcoat') return waistcoatOptions;
    if (activeTab === 'trouser') return trouserOptions;
    return {};
  };

  // Build image source with dynamic fabric path
  const getImageSrc = (garment: string, category: string, optionKey: string) => {
    const options = getCurrentOptions();
    const option = options[category]?.[optionKey];
    if (!option || !option.filename) return '';
    
    const subfolder = option.subfolder || '';
    return getAssetPath(garment, category.charAt(0).toUpperCase() + category.slice(1), subfolder + option.filename);
  };

  // Build layers based on active tab
  const currentLayers = !selectedFabric ? [] : activeTab === 'jacket' ? [
    {
      id: 'closure',
      src: getAssetPath('Jacket', 'Closure', jacketOptions.closure[getCurrentOption('closure')]?.filename),
      visible: true,
      zIndex: 1,
      type: 'full'
    },
    {
      id: 'breastPocket',
      src: getAssetPath('Jacket', 'Pocket/Breast Pocket', jacketOptions.breastPocket[getCurrentOption('breastPocket')]?.filename),
      visible: !!getCurrentOption('breastPocket') && getCurrentOption('breastPocket') !== 'none',
      zIndex: 2,
      type: 'positioned',
      position: { x: 350, y: 150 }
    },
    {
      id: 'hipPocket',
      src: getAssetPath('Jacket', 'Pocket/Hip Pocket', jacketOptions.hipPocket[getCurrentOption('hipPocket')]?.filename),
      visible: !!getCurrentOption('hipPocket') && getCurrentOption('hipPocket') !== 'none',
      zIndex: 3,
      type: 'positioned',
      position: { x: 250, y: 480 }
    },
    {
      id: 'sleeve',
      src: getAssetPath('Jacket', 'Sleeve', jacketOptions.sleeve[getCurrentOption('sleeve')]?.filename),
      visible: !!getCurrentOption('sleeve') && getCurrentOption('sleeve') !== 'none',
      zIndex: 4,
      type: 'positioned',
      position: { x: 0, y: 0 }
    },
    {
      id: 'lapel',
      src: getAssetPath('Jacket', 'Lapel', jacketOptions.lapel[getCurrentOption('lapel')]?.filename),
      visible: true,
      zIndex: 5,
      type: 'full'
    }
  ].filter(layer => layer.src) : activeTab === 'waistcoat' ? [
    {
      id: 'waistcoatClosure',
      src: getAssetPath('Waistcoat', 'Closure', waistcoatOptions.waistcoatClosure[getCurrentOption('waistcoatClosure')]?.filename),
      visible: true,
      zIndex: 1,
      type: 'full'
    },
    {
      id: 'waistcoatPocket',
      src: getAssetPath('Waistcoat', 'Pocket', waistcoatOptions.waistcoatPocket[getCurrentOption('waistcoatPocket')]?.filename),
      visible: !!getCurrentOption('waistcoatPocket') && getCurrentOption('waistcoatPocket') !== 'none',
      zIndex: 2,
      type: 'positioned',
      position: { x: 250, y: 300 }
    },
    {
      id: 'waistcoatVShape',
      src: getAssetPath('Waistcoat', 'V-Shape', waistcoatOptions.waistcoatVShape[getCurrentOption('waistcoatVShape')]?.filename),
      visible: true,
      zIndex: 3,
      type: 'full'
    }
  ].filter(layer => layer.src) : [
    {
      id: 'waistband',
      src: getAssetPath('Trouser', 'Waistband', trouserOptions.waistband[getCurrentOption('waistband')]?.filename),
      visible: true,
      zIndex: 1,
      type: 'full'
    },
    {
      id: 'pleat',
      src: getAssetPath('Trouser', 'Pleat', trouserOptions.pleat[getCurrentOption('pleat')]?.filename),
      visible: true,
      zIndex: 2,
      type: 'full'
    }
  ].filter(layer => layer.src);

  const tabs = [
    { id: 'jacket', name: 'Jacket' },
    { id: 'trouser', name: 'Trouser' },
    { id: 'waistcoat', name: 'Waistcoat' }
  ];

  const jacketSubOptions = [
    { id: 'closure', name: 'Closure', desc: 'Single or double breasted', current: jacketOptions.closure[selectedOptions.closure]?.name },
    { id: 'lapel', name: 'Lapel', desc: 'Notch, peak, or concave', current: jacketOptions.lapel[selectedOptions.lapel]?.name },
    { id: 'sleeve', name: 'Sleeve', desc: 'Sleeve style options', current: jacketOptions.sleeve[selectedOptions.sleeve]?.name },
    { id: 'breastPocket', name: 'Breast Pocket', desc: 'Upper chest pocket styles', current: jacketOptions.breastPocket[selectedOptions.breastPocket]?.name },
    { id: 'hipPocket', name: 'Hip Pocket', desc: 'Lower jacket pocket styles', current: jacketOptions.hipPocket[selectedOptions.hipPocket]?.name },
    { id: 'monogram', name: 'Monogram', desc: 'Personal embroidery', current: jacketOptions.monogram[selectedOptions.monogram]?.name }
  ];

  const waistcoatSubOptions = [
    { id: 'waistcoatClosure', name: 'Closure', desc: 'Waistcoat button style', current: waistcoatOptions.waistcoatClosure[selectedOptions.waistcoatClosure]?.name },
    { id: 'waistcoatPocket', name: 'Pocket', desc: 'Side pocket styles', current: waistcoatOptions.waistcoatPocket[selectedOptions.waistcoatPocket]?.name },
    { id: 'waistcoatVShape', name: 'V-Shape', desc: 'Lapel V-shape style', current: waistcoatOptions.waistcoatVShape[selectedOptions.waistcoatVShape]?.name }
  ];

  const trouserSubOptions = [
    { id: 'waistband', name: 'Waistband', desc: 'Waistband style options', current: trouserOptions.waistband[selectedOptions.waistband]?.name },
    { id: 'pleat', name: 'Pleat', desc: 'Pleat style options', current: trouserOptions.pleat[selectedOptions.pleat]?.name }
  ];

  const getSubOptions = () => {
    if (activeTab === 'jacket') return jacketSubOptions;
    if (activeTab === 'waistcoat') return waistcoatSubOptions;
    if (activeTab === 'trouser') return trouserSubOptions;
    return [];
  };

  const previewOptionHandler = (optionKey: string) => {
    setPreviewOption(optionKey);
  };

  const confirmSelection = () => {
    if (previewOption && activeSubOption) {
      setSelectedOptions(prev => ({...prev, [activeSubOption]: previewOption}));
      setPreviewOption(null);
      setActiveSubOption(null);
    }
  };

  const cancelSelection = () => {
    setPreviewOption(null);
  };

  // Fabric Selection Screen
  if (!selectedFabric) {
    return (
      <main className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-6">
          <div className="mb-8 text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Choose Your Fabric</h1>
            <p className="text-gray-600">Select a fabric to begin customizing your suit</p>
          </div>

          {Object.entries(fabricsByCategory).map(([category, fabrics]) => (
            <div key={category} className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Weight {category}</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {fabrics.map(fabric => (
                  <button
                    key={fabric.id}
                    onClick={() => setSelectedFabric(fabric.id)}
                    className="group bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg hover:border-gray-300 transition-all"
                  >
                    <div className="aspect-square bg-gray-100">
                      <img 
                        src={fabric.fabricImage} 
                        alt={fabric.displayName}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-medium text-gray-900 text-sm">{fabric.displayName}</h3>
                      <p className="text-xs text-gray-500 mt-1">Weight {fabric.category}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </main>
    );
  }

  // Main Customizer (after fabric selected)
  return (
    <main className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-6">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Suit Customizer</h1>
            <p className="text-gray-600">
              Fabric: <span className="font-medium">{fabricRegistry.find(f => f.id === selectedFabric)?.displayName}</span>
            </p>
          </div>
          <button 
            onClick={() => setSelectedFabric(null)}
            className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50"
          >
            Change Fabric
          </button>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          <div className="lg:col-span-3">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
              <div className="flex justify-center">
                <Canvas width={600} height={800} layers={currentLayers} />
              </div>
            </div>
          </div>
          
          <div className="lg:col-span-2 space-y-4">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
              <div className="flex border-b border-gray-100">
                {tabs.map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => {
                      setActiveTab(tab.id);
                      setActiveSubOption(null);
                      setPreviewOption(null);
                    }}
                    className={`flex-1 py-3 px-4 font-medium text-sm ${
                      activeTab === tab.id
                        ? 'text-gray-900 border-b-2 border-gray-900 bg-gray-50'
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    {tab.name}
                  </button>
                ))}
              </div>

              <div className="p-4">
                {activeSubOption && (
                  <div className="flex items-center justify-between mb-4">
                    <button
                      onClick={() => {
                        setActiveSubOption(null);
                        setPreviewOption(null);
                      }}
                      className="flex items-center text-gray-600 hover:text-gray-900"
                    >
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                      Back to options
                    </button>
                  </div>
                )}

                {previewOption && activeSubOption && (
                  <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                    <div className="text-sm text-blue-800 mb-3">
                      Preview: {getCurrentOptions()[activeSubOption][previewOption]?.name}
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={confirmSelection}
                        className="flex-1 bg-blue-600 text-white py-2 px-4 rounded font-medium hover:bg-blue-700"
                      >
                        ✓ Confirm Selection
                      </button>
                      <button
                        onClick={cancelSelection}
                        className="flex-1 bg-gray-200 text-gray-700 py-2 px-4 rounded font-medium hover:bg-gray-300"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                )}

                {!activeSubOption && (
                  <div className="space-y-3">
                    <h3 className="font-semibold text-gray-900 mb-4 capitalize">{activeTab} Options</h3>
                    {getSubOptions().map(option => (
                      <button
                        key={option.id}
                        onClick={() => setActiveSubOption(option.id)}
                        className="w-full p-4 text-left border border-gray-200 rounded-lg hover:border-gray-300 hover:shadow-sm transition-all"
                      >
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <div className="font-medium text-gray-900">{option.name}</div>
                            <div className="text-sm text-gray-500 mt-1">{option.desc}</div>
                            {option.current && (
                              <div className="text-sm text-blue-600 mt-1 font-medium">
                                Current: {option.current}
                              </div>
                            )}
                          </div>
                          <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </div>
                      </button>
                    ))}
                  </div>
                )}

                {activeSubOption && (
                  <div className="space-y-3">
                    <h3 className="font-semibold text-gray-900 capitalize mb-4">
                      {activeSubOption.replace(/([A-Z])/g, ' $1').trim()} Options
                    </h3>
                    {Object.entries(getCurrentOptions()[activeSubOption] || {}).map(([key, option]) => (
                      <button
                        key={key}
                        onClick={() => previewOptionHandler(key)}
                        className={`w-full p-4 text-left border rounded-lg transition-all ${
                          selectedOptions[activeSubOption] === key
                            ? 'border-green-500 bg-green-50'
                            : previewOption === key
                            ? 'border-blue-500 bg-blue-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className="flex justify-between items-start">
                          <div className="font-medium text-gray-900">{option.name}</div>
                          <div>
                            {selectedOptions[activeSubOption] === key && (
                              <span className="text-green-600 text-sm font-medium">✓ Selected</span>
                            )}
                            {previewOption === key && selectedOptions[activeSubOption] !== key && (
                              <span className="text-blue-600 text-sm font-medium">Preview</span>
                            )}
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}