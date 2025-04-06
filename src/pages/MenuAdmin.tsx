import React, { useEffect, useState } from 'react';
import { 
  IonContent, IonHeader, IonPage, IonTitle, IonToolbar,
  IonButton, IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle,
  IonCardContent, IonLoading, IonIcon
} from '@ionic/react';
import { useHistory } from 'react-router-dom';
import { UserService } from '../services/UserService';
import { shieldCheckmark, logOutOutline, ribbonOutline } from 'ionicons/icons'; // İkonlar!!!!!! fazlasını araştır
import './MenuAdmin.css';

const MenuAdmin: React.FC = () => {
  const [admin, setAdmin] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const history = useHistory();

  useEffect(() => {
    // Sayfa yüklendiğinde admin kontrolü yapılır
    const checkAdmin = async () => {
      try { // Mevcut kullanıcı bilgisi alınır
        const currentUser = await UserService.getCurrentUser();
        if (!currentUser || currentUser.username !== 'admin') {
          // Eğer kullanıcı yoksa veya admin değilse giriş sayfasına yönlendirilir
          history.push('/login');
          return;
        } // Admin kullanıcısının adı ekranda gösterilmek üzere kaydedilir
        setAdmin(currentUser.fullName || 'Admin');
      } catch (error: any) { // Hata olması durumunda konsola yazılır ve giriş sayfasına yönlendirilir
        console.error('Admin kontrolü sırasında hata:', error);
        history.push('/login');
      } finally { // Yükleme işlemi sona erdirilir
        setLoading(false);
      }
    };

    checkAdmin();
  }, [history]);

  const handleLogout = async () => {
    try {
      await UserService.logout(); // Kullanıcı oturumu kapatılır
      history.push('/login');
    } catch (error: any) { // Hata olması durumunda konsola yazılır
      console.error('Çıkış sırasında hata:', error);
    }
  };

  if (loading) {
    return (
      <IonPage>
        <IonLoading isOpen={loading} message={'Yükleniyor...'} />
      </IonPage>
    );
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="dark">
          <IonTitle className="admin-title">👑 Yönetici Paneli 👑</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="admin-content ion-padding">
        <IonCard className="admin-card">
          <IonCardHeader>
            <IonCardSubtitle>Hoş Geldin, Yönetici!</IonCardSubtitle>
            <IonCardTitle>🔥 {admin} 🔥</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <p style={{ fontSize: '18px', fontWeight: 'bold', textAlign: 'center' }}>
              Aaaa ben adminim! :D 🎉
            </p>
            <p style={{ textAlign: 'center', color: '#ff6f61' }}>Burada dünyayı yönetebilirsin! 🚀</p>
          </IonCardContent>
        </IonCard>

        <IonButton expand="block" color="warning" className="special-button" style={{ marginTop: '20px' }}>
          <IonIcon icon={shieldCheckmark} slot="start" /> Admin Ayrıcalıkları
        </IonButton>

        <IonButton expand="block" color="tertiary" className="special-button" style={{ marginTop: '10px' }}>
          <IonIcon icon={ribbonOutline} slot="start" /> Kullanıcı Yönetimi
        </IonButton>

        <IonButton expand="block" color="danger" className="special-button" style={{ marginTop: '10px' }} onClick={handleLogout}>
          <IonIcon icon={logOutOutline} slot="start" /> Çıkış Yap
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default MenuAdmin;
