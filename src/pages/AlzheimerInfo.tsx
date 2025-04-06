import React from 'react';
import { IonPage, IonContent, IonHeader, IonToolbar, IonTitle, IonLabel, IonItem } from '@ionic/react';

const AlzheimerInfo: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Alzheimer Hakkında Bilgiler</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonItem>
          <IonLabel>
            <h2>Alzheimer Hastalığı</h2>
            Alzheimer, beyindeki hücrelerin ölmesi nedeniyle hafıza kaybı ve düşünme yeteneğinde azalma ile sonuçlanan, ilerleyici bir nörolojik hastalıktır. Bu hastalık genellikle yaşlılıkla ilişkilendirilse de, genç yaşlarda da görülebilir. Alzheimer hastalığının belirtileri arasında hafıza kaybı, kafa karışıklığı, karar vermede zorluk ve günlük yaşam aktivitelerinin gerçekleştirilmesinde güçlükler yer alır. 
            <p><strong>Faydalı Bilgiler:</strong></p>
            - Düzenli egzersiz yapmak, beyin sağlığını iyileştirebilir.  
            - Sağlıklı beslenme, omega-3 yağ asitleri ve antioksidanlarla zengin gıdalar alımı beyin sağlığını destekler.  
            - Zihinsel egzersizler yapmak, yeni şeyler öğrenmek ve sosyal etkileşimde bulunmak beynin sağlıklı kalmasına yardımcı olabilir.
          </IonLabel>
        </IonItem>
      </IonContent>
    </IonPage>
  );
};

export default AlzheimerInfo;
