export interface InitialBotModalValues {
  token: string
}

export interface CommunityBotModalProps {
  modalIsOpen: boolean;
  closeModal: () => void;
  token: string;
  title?: string;
  description?: string;
  fieldLabel?: string;
  placeholder?: string;
  errorMessage?: string;
  submitButtonLabel?: string;
  initialValues: InitialBotModalValues;
  validationSchema: {
    token: string;
  };
  onSubmit: (values: { token: string }) => Promise<void>;
  submitting?: boolean;
  communtyDetailLabel: {
    title: string;
    description: string;
    fieldLabel: string;
    placeholder: string;
    submitButtonLabel: string;
  };
}