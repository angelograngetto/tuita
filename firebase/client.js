import firebase from 'firebase'

const firebaseConfig = {
  apiKey: 'AIzaSyD3iOpj8YMJdXiwHzRxiqUDLIcnGKVUAlw',
  authDomain: 'devter-45834.firebaseapp.com',
  projectId: 'devter-45834',
  storageBucket: 'devter-45834.appspot.com',
  messagingSenderId: '541902271442',
  appId: '1:541902271442:web:d89f60fcfe41106b418e0b'
}

!firebase.apps.length &&
  firebase.initializeApp(firebaseConfig)

const db = firebase.firestore()

const mapUserFromFirebaseAuthToUser = (user) => {
  const { displayName, email, photoURL, uid } = user

  return {
    avatar: photoURL,
    username: displayName,
    email,
    uid
  }
}

export const onAuthStateChanged = (onChange) => {
  return firebase.auth().onAuthStateChanged(user => {
    const normalizedUser = user ? mapUserFromFirebaseAuthToUser(user) : null
    onChange(normalizedUser)
  })
}

export const logout = () => {
  return firebase.auth().signOut()
}

export const loginWithGitHub = () => {
  const githubProvider = new firebase.auth.GithubAuthProvider()
  return firebase
    .auth()
    .signInWithPopup(githubProvider)
}

export const addTuit = ({ avatar, content, userId, userName, img }) => {
  return db.collection('tuits').add({
    avatar,
    content,
    img,
    userId,
    userName,
    createdAt: firebase.firestore.Timestamp.fromDate(new Date()),
    likesCount: 0,
    sharedCount: 0
  })
}

const mapTuitFromFirebaseToTuitObject = doc => {
  const data = doc.data()
  const id = doc.id
  const { createdAt } = data

  return { ...data, id, createdAt: +createdAt.toDate() }
}

export const listenLatestTuits = (callback) => {
  return db.collection('tuits')
    .orderBy('createdAt', 'desc')
    .limit(20)
    .onSnapshot(({ docs }) => {
      const newTuits = docs.map(mapTuitFromFirebaseToTuitObject)
      callback(newTuits)
    })
}

export const fetchLatestTuits = () => {
  return db.collection('tuits')
    .orderBy('createdAt', 'desc')
    .get()
    .then(({ docs }) => {
      return docs.map(mapTuitFromFirebaseToTuitObject)
    })
}

export const uploadImage = (file) => {
  const ref = firebase.storage().ref(`images/${file.name}`)
  const task = ref.put(file)
  return task
}
