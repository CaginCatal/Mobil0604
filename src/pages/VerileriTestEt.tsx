// src/pages/VerileriTestEt.tsx
import React from 'react';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/react';

const VerileriTestEt: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Verileri Test Et</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <h2>Burada verilerinizi test edebilirsiniz.</h2>
        {/* Test işlemi yapılacak bileşenleri buraya ekleyebilirsiniz */}
      </IonContent>
    </IonPage>
  );
};

export default VerileriTestEt;
