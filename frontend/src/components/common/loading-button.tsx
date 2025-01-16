import { Button, ButtonProps } from "../ui/button";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

interface LoadingButtonProps extends ButtonProps {
  isLoading: boolean;
}

const LoadingButton = ({
  isLoading,
  children,
  ...props
}: LoadingButtonProps) => {
  return (
    <Button {...props} disabled={isLoading}>
      {isLoading && <AiOutlineLoading3Quarters className="animate-spin mr-2" />}

      {children}
    </Button>
  );
};

export default LoadingButton;
