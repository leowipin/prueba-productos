export interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
    labelContent: string;
    srOnly?: boolean;
    isPassword?: boolean;
    error?: string;
    showError?: boolean;
}
