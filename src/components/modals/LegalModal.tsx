"use client";

import { Modal } from "@/components/ui/Modal";

interface LegalModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: "kullanim" | "kvkk";
}

const KULLANIM_KOSULLARI = `
HukukAI Hizmet Kullanım Koşulları

1. Hizmetin Kapsamı
HukukAI, yapay zeka destekli genel hukuki bilgi ve yönlendirme sunan bir platformdur. Kesin hukuki danışmanlık veya avukatlık hizmeti yerine geçmez.

2. Kullanıcı Yükümlülükleri
Platformu yasalara uygun kullanmak, yanıltıcı bilgi vermemek ve üçüncü kişilerin haklarına saygı göstermekle yükümlüsünüz.

3. Sorumluluk Sınırlaması
HukukAI tarafından verilen bilgiler genel amaçlıdır. Özel durumunuz için mutlaka uzman bir hukukçuya danışınız.

4. Fikri Mülkiyet
Platform içeriği ve yazılımı HukukAI'a aittir. İzinsiz kopyalama yasaktır.
`;

const KVKK_METNI = `
Aydınlatma Metni — Kişisel Verilerin Korunması

1. Veri Sorumlusu
HukukAI olarak 6698 sayılı KVKK kapsamında kişisel verilerinizi işlemekteyiz.

2. İşlenen Veriler
Ad, soyad, e-posta, kullanım verileri ve sohbet içerikleri işlenebilmektedir.

3. İşleme Amaçları
Hizmet sunumu, müşteri desteği, platform iyileştirmesi ve yasal yükümlülüklerin yerine getirilmesi.

4. Haklarınız
İlgili kişi olarak bilgi talep etme, düzeltme, silme ve itiraz etme haklarınız bulunmaktadır.
`;

export function LegalModal({ isOpen, onClose, type }: LegalModalProps) {
  const content = type === "kvkk" ? KVKK_METNI : KULLANIM_KOSULLARI;
  const title = type === "kvkk" ? "KVKK Aydınlatma Metni" : "Kullanım Koşulları";

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title}>
      <pre className="text-txt2 text-sm whitespace-pre-wrap font-sans max-h-[60vh] overflow-y-auto leading-relaxed">
        {content}
      </pre>
    </Modal>
  );
}
