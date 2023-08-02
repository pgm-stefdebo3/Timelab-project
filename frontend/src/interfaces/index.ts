interface DeconstructedObject {
    [key: string]: any;
}

interface layer {
id: number,
name: string,
}

interface MarkerDataGridProps {
json: any[],
layers: layer[],
}

interface FormData {
    layerId?: number | null,
    coordinateField?: string,
    title?: string,
    description?: string,
}

interface MarkerInput {
    type: string,
    name: string,
    coords: Coordinate[],
    layerId?: number | null,
    description?: string,
}

interface ButtonProps {
    type: "submit" | "button" | "reset" | undefined;
    disabled?: boolean;
    children: React.ReactNode;
    className?: string;
    onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

interface Coordinate {
    lat: number,
    lng: number,
}

interface MarkerImportFormProps {
    selectedRows: any[],
    layers: layer[],
    setModal: (value: string) => void,
    formData: FormData,
    setFormData: (value: object) => void,
}

interface CloseButtonProps {
    onClick: () => void,
}

interface ConditionalLoaderProps {
    condition: boolean,
    children: React.ReactNode,
}

interface CustomCheckboxProps {
  disabled?: boolean;
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  initialChecked: boolean;
  name: string;
}

interface DashboardMainProps {
  children: React.ReactNode;
  active: string;
}

interface MassModalProps {
    visible: boolean,
    setVisible: (e:  string) => void,
    children: React.ReactNode,
    removeCloseButton?: boolean | undefined,
}

interface SVGButtonProps {
    small?: boolean,
    onClick: () => void,
    children: React.ReactNode,
}

interface CrudDataGridProps {
    rows: any[];
    columns: any[];
}

export type {
    DeconstructedObject,
    MarkerDataGridProps,
    MarkerImportFormProps,
    layer,
    MarkerInput,
    Coordinate,
    ButtonProps,
    CloseButtonProps,
    ConditionalLoaderProps,
    CustomCheckboxProps,
    DashboardMainProps,
    MassModalProps,
    SVGButtonProps,
    CrudDataGridProps,
}