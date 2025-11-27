import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { FaChevronDown } from "react-icons/fa6";
import { customerStyles } from "@/styles/customer.styles";

interface Option {
  value: string;
  label: string;
}

interface Props {
  value: string;
  onChange: (value: string) => void;
  options: Option[];
  placeholder?: string;
}

export default function CustomSelect({ value, onChange, options, placeholder = "Select option" }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [coords, setCoords] = useState<{ top: number; left: number; width: number } | null>(null);
  const triggerRef = useRef<HTMLDivElement>(null);

  // Tính toán vị trí khi mở
  useEffect(() => {
    if (isOpen && triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      setCoords({
        top: rect.bottom + window.scrollY + 4,
        left: rect.left + window.scrollX,
        width: rect.width,
      });
    } else {
      setCoords(null); // Reset khi đóng để tránh flash vị trí cũ
    }
  }, [isOpen]);

  // Close on click outside & Scroll
  useEffect(() => {
    function handleEvent(event: Event) {
        if(isOpen) setIsOpen(false);
    }
    
    if (isOpen) {
        window.addEventListener("resize", handleEvent);
        window.addEventListener("scroll", handleEvent, true);
        window.addEventListener("click", (e) => {
            if (triggerRef.current && !triggerRef.current.contains(e.target as Node)) {
                setIsOpen(false);
            }
        });
    }

    return () => {
        window.removeEventListener("resize", handleEvent);
        window.removeEventListener("scroll", handleEvent, true);
    };
  }, [isOpen]);

  const selectedLabel = options.find(opt => opt.value === value)?.label || placeholder;

  // Render Dropdown qua Portal
  // Chỉ render khi isOpen vả coords đã được tính toán (khác null)
  const dropdownContent = isOpen && coords && (
    <div 
        className={customerStyles.customSelect.dropdown}
        style={{ 
            top: coords.top, 
            left: coords.left, 
            width: coords.width,
            position: 'absolute' // Dùng absolute thay cho fixed nếu render vào body để tránh lỗi scroll, nhưng portal thường dùng fixed/absolute tuỳ context. Ở đây style object đã set fixed, ta override inline nếu cần.
            // Tuy nhiên, style object đã có class 'fixed', ta giữ nguyên.
        }}
        onMouseDown={(e) => e.stopPropagation()} 
    >
      <div className={customerStyles.customSelect.optionsContainer}>
        {options.map((option) => (
            <div
            key={option.value}
            onClick={(e) => {
                e.stopPropagation();
                onChange(option.value);
                setIsOpen(false);
            }}
            className={customerStyles.customSelect.option(option.value === value)}
            >
            {option.label}
            </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className={customerStyles.customSelect.wrapper}>
      <div
        ref={triggerRef}
        onClick={() => setIsOpen(!isOpen)}
        className={customerStyles.customSelect.trigger}
      >
        <span>{selectedLabel}</span>
        <FaChevronDown className={customerStyles.customSelect.icon(isOpen)} />
      </div>

      {typeof document !== 'undefined' && createPortal(dropdownContent, document.body)}
    </div>
  );
}