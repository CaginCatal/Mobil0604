import { auth, db } from '../firebase';
import { User } from '../models/User';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged 
} from 'firebase/auth';
import { 
  collection, 
  doc, 
  setDoc, 
  getDoc, 
  query, 
  where, 
  getDocs, 
  serverTimestamp 
} from 'firebase/firestore';

export class UserService {
  // Kullanıcı kaydı
  static async register(user: User): Promise<User> {
    try {
      // Firebase Authentication ile kullanıcı oluştur
      const userCredential = await createUserWithEmailAndPassword(auth, user.email, user.password || '');
      const uid = userCredential.user?.uid;
      
      if (!uid) throw new Error('Kullanıcı kaydı başarısız oldu.');
      
      // Şifreyi kullanıcı nesnesinden çıkar
      const { password, ...userWithoutPassword } = user;
      
      // Kullanıcıyı Firestore'a kaydet
      const userRef = doc(db, 'users', uid);
      await setDoc(userRef, {
        ...userWithoutPassword,
        id: uid,
        createdAt: serverTimestamp()
      });
      
      return { ...userWithoutPassword, id: uid };
    } catch (error: any) {
      console.error('Kayıt hatası:', error);
      throw error;
    }
  }
  
  // Kullanıcı girişi (username ve şifre ile)
  static async login(username: string, password: string): Promise<User | null> {
    try {
      // Önce username'e göre kullanıcıyı bul
      const usersRef = collection(db, 'users');
      const q = query(usersRef, where('username', '==', username));
      const querySnapshot = await getDocs(q);
      
      if (querySnapshot.empty) {
        throw new Error('Kullanıcı bulunamadı');
      }
      
      // Kullanıcının e-posta adresini al
      const userDoc = querySnapshot.docs[0];
      const userData = userDoc.data() as User;
      
      // Email ve şifre ile giriş yap
      await signInWithEmailAndPassword(auth, userData.email, password);
      
      return { ...userData, id: userDoc.id };
    } catch (error: any) {
      console.error('Giriş hatası:', error);
      throw error;
    }
  }
  
  // Mevcut kullanıcıyı kontrol et
  static async getCurrentUser(): Promise<User | null> {
    return new Promise((resolve) => {
      const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
        unsubscribe();
        
        if (firebaseUser) {
          const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
          if (userDoc.exists()) {
            resolve(userDoc.data() as User);
          } else {
            resolve(null);
          }
        } else {
          resolve(null);
        }
      });
    });
  }
  
  // Çıkış yap
  static async logout(): Promise<void> {
    return signOut(auth);
  }
}