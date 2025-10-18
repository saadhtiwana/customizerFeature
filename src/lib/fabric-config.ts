// src/lib/fabric-config.ts

export interface FabricOption {
    id: string;
    displayName: string;
    category: string;
    fabricImage: string;
  }
  
  export const fabricRegistry: FabricOption[] = [
    // 70 Weight Category
    {
      id: 'F-ASSET-73401',
      displayName: 'F-ASSET-73401', // ← UPDATE THIS LATER with proper name
      category: '70',
      fabricImage: '/assets/70/F-ASSET-73401/Fabric.png'
    },
    {
      id: 'F-ASSET-73433',
      displayName: 'F-ASSET-73433', // ← UPDATE THIS LATER
      category: '70',
      fabricImage: '/assets/70/F-ASSET-73433/Fabric.png'
    },
    
    // 80 Weight Category
    {
      id: 'F-ASSET-GD31007_6',
      displayName: 'F-ASSET-GD31007_6', // ← UPDATE THIS LATER
      category: '80',
      fabricImage: '/assets/80/F-ASSET-GD31007_6/Fabric.png'
    }
    
    // ADD MORE FABRICS HERE AS YOU CREATE THEM
  ];
  
  // Group fabrics by category for organized display
  export const fabricsByCategory = fabricRegistry.reduce((acc, fabric) => {
    if (!acc[fabric.category]) {
      acc[fabric.category] = [];
    }
    acc[fabric.category].push(fabric);
    return acc;
  }, {} as Record<string, FabricOption[]>);