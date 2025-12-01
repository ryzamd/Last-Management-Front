import { useEffect, useState, Fragment, useCallback, useMemo } from 'react';
import { InventoryMatrixDto, InventoryMatrixRow } from '@/types/report';
import { ReportService } from '@/services/report.service';
import clsx from 'clsx';

export default function InventoryMatrixTable() {
  const [data, setData] = useState<InventoryMatrixDto | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const loadData = async () => {
      try {
        const result = await ReportService.getInventoryMatrix();
        if (isMounted) {
            setData(result);
        }
      } catch (error) {
        console.error("Failed to load inventory matrix", error);
      } finally {
        if (isMounted) {
            setLoading(false);
        }
      }
    };
    loadData();

    return () => { isMounted = false };
  }, []);

  // Logic sắp xếp size: Số trước -> Chữ sau -> Tăng dần
  const sortSizeList = useCallback((sizes: string[]) => {
    return [...sizes].sort((a, b) => {
      const valA = Number(a);
      const valB = Number(b);
      
      const isNumA = !isNaN(valA) && a.trim() !== '';
      const isNumB = !isNaN(valB) && b.trim() !== '';

      if (isNumA && isNumB) return valA - valB;
      if (isNumA && !isNumB) return -1;
      if (!isNumA && isNumB) return 1;

      return a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' });
    });
  }, []);

  const getRowSpecificSizes = useCallback((row: InventoryMatrixRow) => {
    const sizeSet = new Set<string>();
    row.departmentRows?.forEach(dept => {
        if (dept.quantities) {
            Object.keys(dept.quantities).forEach(s => sizeSet.add(s));
        }
    });
    return sortSizeList(Array.from(sizeSet));
  }, [sortSizeList]);

  const maxCols = useMemo(() => {
    if (!data?.rows) return 0;
    let max = 0;
    data.rows.forEach(row => {
        const sizes = getRowSpecificSizes(row);
        if (sizes.length > max) max = sizes.length;
    });
    return max > 0 ? max : 5;
  }, [data, getRowSpecificSizes]);

  const getDeptColor = (type: string) => {
    const t = type?.toLowerCase() || "";
    if (t.includes('production')) return "text-[#00FF9C]";
    if (t.includes('development') || t.includes('sample')) return "text-[#FFB300]";
    if (t.includes('quality') || t.includes('qc')) return "text-cyan-400";
    if (t.includes('damage') || t.includes('defect')) return "text-[#FF6B6B]";
    return "text-[#94A3B8]";
  };

  if (loading) return <div className="text-center p-4 text-[#00FF9C] font-mono text-sm animate-pulse tracking-widest">LOADING MATRIX DATA...</div>;
  if (!data || !data.rows || data.rows.length === 0) return null;

  return (
    <div className="w-full xl:w-[80%] mx-auto overflow-hidden rounded-2xl border border-[#2D3748] bg-[#0B0E14] shadow-2xl shadow-black/50 mb-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
      
      <div className="overflow-x-auto">
        <table className="w-full text-center border-collapse text-xs font-mono tracking-wide">
          
          <thead>
            <tr className="bg-[#050505] text-[#00FF9C] font-black uppercase border-b border-[#2D3748] text-[11px] tracking-wider">
              <th className="p-4 border-r border-[#2D3748] min-w-[100px] text-lg">Brand</th>
              <th className="p-4 border-r border-[#2D3748] min-w-[140px] text-lg">Last Name</th>
              
              <th colSpan={maxCols + 1} className="p-4 border-r border-[#2D3748] text-center text-lg text-white">
                Sizes
              </th>

              <th className="p-4 border-r border-[#2D3748] min-w-[70px] text-[#00FF9C] text-lg">Total</th>
              <th className="p-4 min-w-[90px] text-lg">Models</th>
            </tr>
          </thead>
          
          <tbody className="divide-y divide-[#2D3748]">
            {data.rows.map((row, idx) => {
              const deptRows = row.departmentRows ?? [];
              
              // 1. Lấy bộ size riêng cho row này
              const rowSizes = getRowSpecificSizes(row);
              const emptyCells = maxCols - rowSizes.length;

              // 2. Tính toán dòng tổng (Quantity)
              const totalQuantitiesPerSize: Record<string, number> = {};
              rowSizes.forEach(size => {
                totalQuantitiesPerSize[size] = deptRows.reduce((sum, dept) => sum + (dept.quantities?.[size] || 0), 0);
              });

              // 3. RowSpan = 1 (Size Header) + 1 (Total Quantity) + N (Depts)
              const rowSpan = 2 + (deptRows.length > 0 ? deptRows.length : 0);

              return (
                <Fragment key={`matrix-group-${idx}`}>
                  
                  <tr className="bg-[#0F131C] hover:bg-[#161b26] transition-colors group">
                    
                    <td rowSpan={rowSpan} className="p-3 border-r border-[#2D3748] font-bold text-white align-middle bg-[#0B0E14]/50 text-base border-b-2">
                      {row.customerName || "N/A"}
                    </td>
                    
                    <td rowSpan={rowSpan} className="p-3 border-r border-[#2D3748] font-black text-white text-sm align-middle bg-[#0B0E14]/50 tracking-wider border-b-2">
                      {row.lastName}
                    </td>

                    <td className="p-2 border-r border-[#2D3748] text-center pr-6 text-[#FF6B6B] font-bold uppercase text-[10px] border-b border-[#2D3748]/50">
                      Sizes
                    </td>
                    
                    {rowSizes.map((size) => (
                        <td key={`size-header-${idx}-${size}`} className="p-2 border-r border-[#2D3748] min-w-[40px] text-[#FF6B6B] font-bold border-b border-[#2D3748]/50">
                            {size}
                        </td>
                    ))}

                    {Array.from({ length: emptyCells }).map((_, i) => (
                        <td key={`empty-header-${idx}-${i}`} className="p-2 border-r border-[#2D3748] border-b border-[#2D3748]/50"></td>
                    ))}

                    <td className="p-2 border-r border-[#2D3748] border-b border-[#2D3748]/50"></td>
                    
                    <td rowSpan={rowSpan} className="p-3 font-bold text-[#A0AEC0] align-middle bg-[#0B0E14]/50 border-b-2 border-[#2D3748]">
                      {row.lastModel}
                    </td>
                  </tr>

                  <tr className="bg-[#0F131C] hover:bg-[#161b26] transition-colors group">
                    <td className="p-2 border-r border-[#2D3748] text-center pr-6 text-white font-black uppercase text-[11px] border-b border-[#2D3748]/50">
                      Quantity
                    </td>
                    
                    {rowSizes.map((size) => {
                      const totalQty = totalQuantitiesPerSize[size];
                      return (
                        <td key={`total-${idx}-${size}`} className="p-2 border-r border-[#2D3748] text-white font-bold border-b border-[#2D3748]/50">
                          {totalQty > 0 ? totalQty : <span className="text-[#2D3748]">-</span>}
                        </td>
                      );
                    })}

                    {Array.from({ length: emptyCells }).map((_, i) => (
                        <td key={`empty-total-${idx}-${i}`} className="p-2 border-r border-[#2D3748] border-b border-[#2D3748]/50"></td>
                    ))}

                    <td className="p-2 border-r border-[#2D3748] font-black text-[#00FF9C] text-sm border-b border-[#2D3748]/50">
                      {row.totalQuantity}
                    </td>
                  </tr>

                  {deptRows.map((dept, deptIdx) => {
                    const isLastRow = deptIdx === deptRows.length - 1;
                    const borderClass = isLastRow ? "border-b-2 border-[#2D3748]" : "border-b border-[#2D3748]/50";

                    return (
                        <tr key={`dept-${idx}-${deptIdx}`} className="bg-[#0F131C] hover:bg-[#161b26] transition-colors group">
                        <td className={clsx(
                            "p-2 border-r border-[#2D3748] text-center pr-6 font-bold uppercase text-[10px]",
                            "text-[#94A3B8]",
                            borderClass
                        )}>
                            {dept.departmentName}
                        </td>

                        {rowSizes.map((size) => {
                            const qty = dept.quantities?.[size] || 0;
                            const colorClass = getDeptColor(dept.departmentType);
                            return (
                            <td key={`val-${idx}-${deptIdx}-${size}`} className={`p-2 border-r border-[#2D3748] font-medium ${qty > 0 ? colorClass : 'text-[#2D3748]'} ${borderClass}`}>
                                {qty > 0 ? qty : '-'}
                            </td>
                            );
                        })}

                        {Array.from({ length: emptyCells }).map((_, i) => (
                            <td key={`empty-dept-${idx}-${deptIdx}-${i}`} className={`p-2 border-r border-[#2D3748] ${borderClass}`}></td>
                        ))}

                        <td className={`p-2 border-r border-[#2D3748] font-bold text-xs ${getDeptColor(dept.departmentType)} ${borderClass}`}>
                            {dept.total}
                        </td>
                        </tr>
                    );
                  })}
                  
                  {deptRows.length === 0 && (
                       <tr className="bg-[#0F131C] border-b-2 border-[#2D3748]">
                           <td className="p-2 border-r border-[#2D3748] text-right pr-6 text-[#718096] text-[10px]">N/A</td>
                           <td colSpan={maxCols + 1} className="p-2 text-center text-[#2D3748]">-</td>
                       </tr>
                  )}

                </Fragment>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}