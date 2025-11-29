import { useState, useRef, useEffect, useCallback } from "react";
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
  const dropdownRef = useRef<HTMLDivElement>(null);

  const updatePosition = useCallback(() => {
    if (triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      setCoords({
        top: rect.bottom + window.scrollY + 4,
        left: rect.left + window.scrollX,
        width: rect.width,
      });
    }
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        triggerRef.current &&
        !triggerRef.current.contains(event.target as Node) &&
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      updatePosition();

      window.addEventListener("resize", updatePosition);
      window.addEventListener("scroll", updatePosition, true);
      window.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      window.removeEventListener("resize", updatePosition);
      window.removeEventListener("scroll", updatePosition, true);
      window.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, updatePosition]);

  const selectedLabel = options.find(opt => opt.value === value)?.label || placeholder;

  const dropdownContent = isOpen && coords && (
    <div
        ref={dropdownRef}
        className={customerStyles.customSelect.dropdown}
        style={{
            top: coords.top,
            left: coords.left,
            width: coords.width,
            position: 'absolute'
        }}
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
        <span className="truncate pr-2">{selectedLabel}</span>
        <FaChevronDown className={`shrink-0 ${customerStyles.customSelect.icon(isOpen)}`} />
      </div>

      {typeof document !== 'undefined' && createPortal(dropdownContent, document.body)}
    </div>
  );
}