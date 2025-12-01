import { useState } from "react";
import { FaXmark, FaPlus, FaTrashCan } from "react-icons/fa6";
import { lastModelStyles as styles } from "@/styles/lastModel.styles";
import { LastModel, LastNameModel } from "@/types/lastModel";
import CustomSelect from "@/components/ui/CustomSelect";

interface Props {
  isOpen: boolean;
  model: LastModel | null;
  linkedLastNames: LastNameModel[];
  availableLastNames: { value: string; label: string }[];
  isLinking: boolean;
  onClose: () => void;
  onLink: (lastNameId: string) => void;
  onUnlink: (lastNameId: string) => void;
}

export default function ModelAssociationModal({ isOpen, model, linkedLastNames, availableLastNames, isLinking, onClose, onLink, onUnlink }: Props) {
  const [selectedId, setSelectedId] = useState("");

  if (!isOpen || !model) return null;

  // Filter out LastNames that are already linked
  const filteredOptions = availableLastNames.filter(opt =>
    !linkedLastNames.some(link => link.lastNameId === opt.value)
  );

  const handleAdd = () => {
    if (selectedId) {
        onLink(selectedId);
        setSelectedId("");
    }
  };

  return (
    <div className={styles.modal.overlay}>
      <div className={styles.modal.container}>
        <div className={styles.modal.header}>
          <h2 className={styles.modal.title}>
            Manage Links: <span className="text-cyan-400">{model.modelName}</span>
          </h2>
          <button onClick={onClose} className="text-space-500 hover:text-white">
            <FaXmark size={24} />
          </button>
        </div>

        <div className={styles.modal.content}>
            {/* Link Form */}
            <div className={styles.assocModal.linkForm}>
                <div className="flex-1">
                    <label className={styles.modal.label}>Select Last Name to Link</label>
                    <CustomSelect
                        value={selectedId}
                        onChange={setSelectedId}
                        options={filteredOptions}
                        placeholder="Choose Last Name"
                    />
                </div>
                <button
                    onClick={handleAdd}
                    disabled={!selectedId || isLinking}
                    className={styles.assocModal.addBtn}
                >
                    {isLinking ? "..." : <FaPlus />}
                </button>
            </div>

            {/* Linked List */}
            <div>
                <label className={styles.modal.label}>Linked Last Names ({linkedLastNames.length})</label>
                <div className={styles.assocModal.listContainer}>
                    <div className={styles.assocModal.listHeader}>
                        <span>Last Code</span>
                        <span>Action</span>
                    </div>
                    
                    <div className="max-h-60 overflow-y-auto custom-scrollbar bg-space-950/50">
                        {linkedLastNames.length === 0 ? (
                            <div className={styles.assocModal.emptyList}>No Last Names linked to this Model yet.</div>
                        ) : (
                            linkedLastNames.map(link => (
                                <div key={link.id} className={styles.assocModal.listItem}>
                                    <span className={styles.assocModal.itemText}>{link.lastCode}</span>
                                    <button
                                        onClick={() => onUnlink(link.lastNameId)}
                                        className={styles.assocModal.unlinkBtn}
                                        title="Unlink"
                                    >
                                        <FaTrashCan /> Unlink
                                    </button>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>

        <div className={styles.modal.footer}>
          <button onClick={onClose} className={styles.modal.cancelBtn}>Close</button>
        </div>
      </div>
    </div>
  );
}