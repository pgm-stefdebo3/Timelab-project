interface DeconstructedObject {
    [key: string]: any;
}

interface layer {
    id: number,
    name: string,
    markers: MarkerInterface[],
}

interface MarkerDataGridProps {
    json: any[],
    layers: layer[],
    refetch: () => void,
}

interface FormData {
    layerId?: number | null,
    coordinateField?: string,
    title?: string,
    description?: string,
}

interface MarkerFormProps {
    layers: layer[],
    coordinate: [number, number],
    visible: boolean,
    refetch: () => void,
    setFormVisible: (value: string) => void,
}

// named MarkerInterface to avoid confusion with Marker from react-leaflet
interface MarkerInterface {
    id: number, 
    name: string, 
    type: string,
    layerId: number,
    createdAt: Date,
    author: string,
    coordinates: [{latitude: number, longitude: number, id: number}]
}

interface TimestampFormProps {
    marker: number,
    visible: boolean,
    refetch: () => void,
    setFormVisible: (value: boolean) => void,
}

interface MapElementProps {
    marker: MarkerInterface,
    onClick: () => void,
    disabled?: boolean,
}

interface MarkerInput {
    type: string,
    name: string,
    coords: Coordinate[] | [number, number][],
    layerId?: number | null,
    description?: string,
    author?: string,
    createdAt: Date,
}

interface TimestampFormInput {
    description: string,
    author?: string,
    fileName?: string,
    markerId: number,
}

interface ButtonProps {
    type: "submit" | "button" | "reset" | undefined;
    disabled?: boolean;
    children: React.ReactNode;
    className?: string;
    onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

interface TimestampListProps {
    marker: number,
    coordinate: [number, number],
    visible: boolean,
    setFormVisible: (value: string) => void,
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
    refetch: () => void,
}

interface CloseButtonProps {
    onClick: () => void,
}

interface ConditionalLoaderProps {
    condition: boolean,
    children: React.ReactNode,
    className?: string,
}

interface CustomCheckboxProps {
  disabled?: boolean;
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  initialChecked: boolean;
  name: string;
  className?: string;
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
    pageSize: number;
    pageSizeOptions: number[];
}

export type {
    DeconstructedObject,
    MarkerDataGridProps,
    MarkerImportFormProps,
    layer,
    MarkerInterface,
    MarkerInput,
    TimestampFormInput,
    Coordinate,
    ButtonProps,
    CloseButtonProps,
    ConditionalLoaderProps,
    CustomCheckboxProps,
    DashboardMainProps,
    MassModalProps,
    SVGButtonProps,
    CrudDataGridProps,
    MarkerFormProps,
    TimestampListProps,
    TimestampFormProps,
    MapElementProps,
}