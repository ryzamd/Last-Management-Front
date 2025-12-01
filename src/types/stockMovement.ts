export interface StockMovementDto {
    id: string;
    lastNameId: string;
    lastSizeId: string;
    fromDepartmentId?: string;
    toDepartmentId?: string;
    movementType: string;
    quantity: number;
    reason?: string;
    referenceNumber?: string;
    createdBy?: string;
    createdAt: string;
    lastCode?: string;
    sizeLabel?: string;
    fromDepartmentName?: string;
    toDepartmentName?: string;
}