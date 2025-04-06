import React, { useEffect, useState } from 'react';
import { 
  IonContent, IonHeader, IonPage, IonTitle, IonToolbar, 
  IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, 
  IonCardContent, IonLoading, IonButton, IonIcon 
} from '@ionic/react'; 
import { useHistory } from 'react-router-dom'; 
import { UserService } from '../services/UserService'; 
import { User } from '../models/User'; 
import { flaskOutline, exitOutline, rocketOutline } from 'ionicons/icons'; // Kullanılan ikonlar
import './Menu.css'; 

// Menu bileşeni
const Menu: React.FC = () => { 
  // Kullanıcı verilerini tutacak state
  const [user, setUser] = useState<User | null>(null); 
  // Yükleniyor durumunu yöneten state
  const [loading, setLoading] = useState(true); 
  const history = useHistory(); // Yönlendirme işlemleri için history kullanılıyor

  // Kullanıcı bilgilerini kontrol etmek için useEffect
  useEffect(() => { 
    const checkUser = async () => { 
      try {
        const currentUser = await UserService.getCurrentUser(); // Mevcut kullanıcıyı alıyoruz
        
        // Eğer kullanıcı yoksa login sayfasına yönlendiriyoruz
        if (!currentUser) {
          history.push('/login'); 
          return;
        }
        
        setUser(currentUser); // Kullanıcı verilerini state'e set ediyoruz
      } catch (error: any) {
        console.error('Kullanıcı kontrolü sırasında hata:', error); 
        history.push('/login'); // Hata durumunda login sayfasına yönlendiriyoruz
      } finally {
        setLoading(false); // Yüklenme işlemi bittiğinde loading state'ini false yapıyoruz
      }
    };
    
    checkUser(); // Kullanıcıyı kontrol etme işlemini başlatıyoruz
  }, [history]); // history dependency olarak ekleniyor

  // Çıkış yapma fonksiyonu
  const handleLogout = async () => { 
    try {
      await UserService.logout(); // Kullanıcı çıkışı sağlanıyor
      history.push('/login'); // Çıkış yaptıktan sonra login sayfasına yönlendiriliyor
    } catch (error: any) {
      console.error('Çıkış sırasında hata:', error); // Hata durumunda konsola yazdırılıyor
    }
  };

  // "Verilerimi Test Et" butonuna tıklandığında yönlendirme işlemi
  const handleTestDataRedirect = () => {
    history.push('/verileri-test-et'); // Verilerimi Test Et sayfasına yönlendirme (vizedon sonra buraya bak)
  };

  // Yüklenme durumunda sayfa render edilmeden önce loading göstergesi
  if (loading) {
    return (
      <IonPage>
        <IonLoading isOpen={loading} message={'Yükleniyor...'} /> {/* Yükleniyor ekranı */}
      </IonPage>
    );
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Ana Menü</IonTitle> {/* Sayfa başlığı */}
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonCard>
          <IonCardHeader>
            <IonCardSubtitle>Hoş Geldiniz</IonCardSubtitle> {/* Hoş geldiniz mesajı */}
            <IonCardTitle>{user?.fullName}</IonCardTitle> {/* Kullanıcının adı */}
          </IonCardHeader>
          <IonCardContent>
            <p>Kullanıcı Adı: {user?.username}</p> {/* Kullanıcı adı */}
            <p>E-posta: {user?.email}</p> {/* Kullanıcı e-postası */}
          </IonCardContent>
        </IonCard>

        <div className="menu-buttons">
          {/* Verilerimi Test Et butonu */}
          <IonButton onClick={handleTestDataRedirect} className="menu-button" color="primary">
            <IonIcon icon={flaskOutline} /> {/* Flask simgesi */}
            <span>Verilerimi Test Et</span> {/* Buton üzerinde açıklama */}
          </IonButton>

          {/* Çıkış yapma butonu */}
          <IonButton onClick={handleLogout} className="menu-button" color="danger">
            <IonIcon icon={exitOutline} /> {/* Çıkış simgesi */}
            <span>Çıkış Yap</span> {/* Buton üzerinde açıklama */}
          </IonButton>

          {/* Keşfet butonu */}
          <IonButton className="menu-button" color="secondary">
            <IonIcon icon={rocketOutline} /> {/* Roket simgesi */}
            <span>Keşfet</span> {/* Buton üzerinde açıklama */}
          </IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Menu;