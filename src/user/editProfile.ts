import { PrismaClient, User } from "@prisma/client"
import {
  newName,
  newPassword,
  newBirthDate,
  newBirthMonth,
  newBirthYear,
  whatToEdit
} from './prompts'
import { Details } from '@utils/interfaces'
import { shaEncode } from './Sha256'
// import sha1 from 'sha1'

const prisma = new PrismaClient()

// fetch user info
const fetchInfo = async (userLoggedIn: string) => {
  let info = await prisma.user.findFirst({
    where: {
      name: userLoggedIn
    }
  })
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

    if (whattoedit == "Name") {
      let newname = await newName()
      await prisma.user.update({
        where: {
          name: userLoggedIn
        },
        data: {
          name: newname
        }
      }).then(() => {
        console.log("Name updated successfully.")
      })
    } else if (whattoedit == "Birth date") {
      let newbirthdate = await newBirthDate()
      await prisma.user.update({
        where: {
          name: userLoggedIn
        },
        data: {
          birthdate: Number(newbirthdate)
        }
      }).then(() => {
        console.log("Birth date updated successfully.")
      })
    } else if (whattoedit == "Birth month") {
      let newbirthmonth = await newBirthMonth()
      await prisma.user.update({
        where: {
          name: userLoggedIn
        },
        data: {
          birthmonth: newbirthmonth
        }
      }).then(() => {
        console.log("Birth month updated successfully.")
      })
    } else if (whattoedit == "Birth year") {
      let newbirthyear = await newBirthYear()
      await prisma.user.update({
        where: {
          name: userLoggedIn
        },
        data: {
          birthyear: newbirthyear
        }
      }).then(() => {
        console.log("Birth year updated successfully.")
      })
    } else {
      let newpassword = shaEncode(await newPassword())
      await prisma.user.update({
        where: {
          name: userLoggedIn
        },
        data: {
          password: newpassword
        }
      }).then(() => {
        console.log("Password updated successfully.")
      })
    }
  }
}

export { editProfile }