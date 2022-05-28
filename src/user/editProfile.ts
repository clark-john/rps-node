import { User } from '../utils/Schema'
import 'dotenv/config'
import mongoose from 'mongoose'
import Details, {
  newName,
  newPassword,
  newBirthDate,
  newBirthMonth,
  newBirthYear,
  whatToEdit
} from './prompts'
import sha1 from 'sha1'

// mongoose implementation
const fetchInfo = async (userLoggedIn: string) => {
  await mongoose.connect(process.env.MONGODB_URI as string)
  let info = await User.findOne({ name: userLoggedIn })
  return info
}

const editProfile = async (userLoggedIn: string) => {
  let info = await fetchInfo(userLoggedIn)
  if (info) {
    let details: Details = {
      name: info.name,
      password: info.password,
      bdate: info.birthdate,
      bmonth: info.birthmonth,
      byear: info.birthyear
    }
    let whattoedit = await whatToEdit(details)

    if (whattoedit.slice(0,4) == "Name") {
      let newname = await newName()
      await User.updateOne(
        { name: userLoggedIn },
        { name: newname }
      ).then(() => {3
        console.log("Name updateOned successfully.")
      })
    } else if (whattoedit.slice(0,10) == "Birth date") {
      let newbirthdate = await newBirthDate()
      await User.updateOne(
        {
          name: userLoggedIn
        },
        {
          birthdate: Number(newbirthdate)
        }
      ).then(() => {
        console.log("Birth date updateOned successfully.")
      })
    } else if (whattoedit.slice(0,11) == "Birth month") {
      let newbirthmonth = await newBirthMonth()
      await User.updateOne(
        {
          name: userLoggedIn
        },
        {
          birthmonth: newbirthmonth
        }
      ).then(() => {
        console.log("Birth month updateOned successfully.")
      })
    } else if (whattoedit.slice(0,10) == "Birth year") {
      let newbirthyear = await newBirthYear()
      await User.updateOne(
        {
          name: userLoggedIn
        },
        {
          birthyear: newbirthyear
        }
      ).then(() => {
        console.log("Birth year updateOned successfully.")
      })
    } else {
      let newpassword = sha1(await newPassword())
      await User.updateOne(
        {
          name: userLoggedIn
        },
        {
          password: newpassword
        }
      ).then(() => {
        console.log("Password updateOned successfully.")
      })
    }
  }
}

export { editProfile }