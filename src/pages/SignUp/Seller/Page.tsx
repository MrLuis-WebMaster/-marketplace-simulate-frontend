import { UserRole } from "../../../types/user.type"
import FormSignUp from "../components/FormSignUp"

const Seller = () => {
  return (
    <FormSignUp role={UserRole.SELLER} />
  )
}

export default Seller