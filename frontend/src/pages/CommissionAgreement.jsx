import React, { useState } from 'react';
import { FileText, CheckCircle } from 'lucide-react';

const CommissionAgreement = ({ onAgree, propertyData, agentData }) => {
  const [language, setLanguage] = useState('english');
  const [agreed, setAgreed] = useState(false);
  const [signature, setSignature] = useState('');
  const [date, setDate] = useState(new Date().toLocaleDateString());

  const agreementText = {
    english: {
      title: "EXCLUSIVE LISTING & COMMISSION AGREEMENT",
      subtitle: "AuditDNA Elite - Mexico Real Estate Platform",
      recitals: "This Agreement is entered into between the undersigned Real Estate Agent (\"Agent\") and AuditDNA Elite Platform (\"Platform\"), operated by Everwise Home Loans & Realty.",
      terms: [
        { heading: "1. COMMISSION STRUCTURE", content: "Agent agrees to a 50/50 commission split on all transactions originated through this Platform. The total commission shall be divided equally between the Agent and the Platform upon successful closing of any property listed herein." },
        { heading: "2. PLATFORM SERVICES", content: "The Platform agrees to provide: (a) Property listing visibility across Mexico and USA markets, (b) Marketing and promotional services, (c) Financing coordination through affiliated mortgage services, (d) QR code generation for property marketing, (e) Secure document management system, (f) Lead generation and inquiry management." },
        { heading: "3. AGENT RESPONSIBILITIES", content: "Agent warrants and represents that: (a) All property information provided is accurate and complete, (b) Agent has obtained proper authorization from the property owner to list the property, (c) Property owner is aware of and consents to the commission structure, (d) All required disclosures have been made to the property owner, (e) Agent will respond promptly to all inquiries generated through the Platform." },
        { heading: "4. NON-CIRCUMVENTION CLAUSE", content: "The Platform agrees not to contact the Agent's clients directly except for the following purposes: (a) To present legitimate purchase offers, (b) To discuss financing options for qualified buyers, (c) To coordinate property showings at the Agent's request. All other communications shall be directed through the Agent." },
        { heading: "5. PROPERTY OWNER AUTHORIZATION", content: "Agent certifies that the property owner has provided written authorization to list the property and is aware of: (a) The commission structure and split arrangement, (b) The Platform's role in marketing and promoting the property, (c) The potential for financing facilitation through affiliated services." },
        { heading: "6. EXCLUSIVE LISTING PERIOD", content: "This agreement grants the Platform exclusive marketing rights for the listed property for a period of 180 days from the date of approval, unless otherwise terminated by mutual written agreement." },
        { heading: "7. PAYMENT TERMS", content: "Commission payment shall be processed within 5 business days following successful closing and receipt of all required documentation. Payment shall be made via wire transfer or certified check to the Agent's designated account." },
        { heading: "8. TERMINATION", content: "Either party may terminate this agreement with 30 days written notice. Any pending transactions at the time of termination shall remain subject to the commission terms herein." },
        { heading: "9. DISPUTE RESOLUTION", content: "Any disputes arising from this agreement shall be resolved through binding arbitration in accordance with the laws of the State of California and the applicable laws of Mexico for properties located therein." },
        { heading: "10. INDEMNIFICATION", content: "Agent agrees to indemnify and hold harmless the Platform from any claims, damages, or liabilities arising from inaccurate property information, unauthorized listings, or breach of fiduciary duty to clients." }
      ],
      acknowledgment: "By signing below, Agent acknowledges that they have read, understood, and agree to be bound by all terms and conditions set forth in this Agreement. Agent certifies that they have the authority to enter into this agreement and that all information provided is true and accurate.",
      signatureLabel: "Agent Signature (Type Full Name)",
      dateLabel: "Date",
      agreeCheckbox: "I have read and agree to the terms and conditions of this Exclusive Listing & Commission Agreement",
      submitButton: "Sign and Submit Agreement",
      footer: "This agreement is governed by the laws of the State of California, USA, and applicable laws of Mexico. For questions regarding this agreement, contact legal@auditdna.com"
    },
    spanish: {
      title: "ACUERDO EXCLUSIVO DE LISTADO Y COMISIÃ“N",
      subtitle: "AuditDNA Elite - Plataforma de Bienes RaÃ­ces en MÃ©xico",
      recitals: "Este Acuerdo se celebra entre el Agente de Bienes RaÃ­ces firmante (\"Agente\") y la Plataforma AuditDNA Elite (\"Plataforma\"), operada por Everwise Home Loans & Realty.",
      terms: [
        { heading: "1. ESTRUCTURA DE COMISIÃ“N", content: "El Agente acepta una divisiÃ³n de comisiÃ³n 50/50 en todas las transacciones originadas a travÃ©s de esta Plataforma. La comisiÃ³n total se dividirÃ¡ equitativamente entre el Agente y la Plataforma al cierre exitoso de cualquier propiedad listada aquÃ­." },
        { heading: "2. SERVICIOS DE LA PLATAFORMA", content: "La Plataforma se compromete a proporcionar: (a) Visibilidad del listado de propiedades en mercados de MÃ©xico y EE.UU., (b) Servicios de marketing y promociÃ³n, (c) CoordinaciÃ³n de financiamiento a travÃ©s de servicios hipotecarios afiliados, (d) GeneraciÃ³n de cÃ³digos QR para marketing de propiedades, (e) Sistema seguro de gestiÃ³n de documentos, (f) GeneraciÃ³n de prospectos y gestiÃ³n de consultas." },
        { heading: "3. RESPONSABILIDADES DEL AGENTE", content: "El Agente garantiza y declara que: (a) Toda la informaciÃ³n de la propiedad proporcionada es precisa y completa, (b) El Agente ha obtenido la autorizaciÃ³n adecuada del propietario para listar la propiedad, (c) El propietario estÃ¡ informado y consiente la estructura de comisiÃ³n, (d) Se han realizado todas las divulgaciones requeridas al propietario, (e) El Agente responderÃ¡ prontamente a todas las consultas generadas a travÃ©s de la Plataforma." },
        { heading: "4. CLÃUSULA DE NO INTERMEDIACIÃ“N", content: "La Plataforma se compromete a no contactar directamente a los clientes del Agente excepto para los siguientes propÃ³sitos: (a) Presentar ofertas legÃ­timas de compra, (b) Discutir opciones de financiamiento para compradores calificados, (c) Coordinar visitas a la propiedad a solicitud del Agente. Todas las demÃ¡s comunicaciones se dirigirÃ¡n a travÃ©s del Agente." },
        { heading: "5. AUTORIZACIÃ“N DEL PROPIETARIO", content: "El Agente certifica que el propietario ha proporcionado autorizaciÃ³n por escrito para listar la propiedad y estÃ¡ informado de: (a) La estructura de comisiÃ³n y el acuerdo de divisiÃ³n, (b) El papel de la Plataforma en el marketing y promociÃ³n de la propiedad, (c) El potencial de facilitaciÃ³n de financiamiento a travÃ©s de servicios afiliados." },
        { heading: "6. PERÃODO DE LISTADO EXCLUSIVO", content: "Este acuerdo otorga a la Plataforma derechos exclusivos de marketing para la propiedad listada por un perÃ­odo de 180 dÃ­as desde la fecha de aprobaciÃ³n, a menos que se termine por acuerdo mutuo por escrito." },
        { heading: "7. TÃ‰RMINOS DE PAGO", content: "El pago de la comisiÃ³n se procesarÃ¡ dentro de 5 dÃ­as hÃ¡biles despuÃ©s del cierre exitoso y la recepciÃ³n de toda la documentaciÃ³n requerida. El pago se realizarÃ¡ mediante transferencia bancaria o cheque certificado a la cuenta designada del Agente." },
        { heading: "8. TERMINACIÃ“N", content: "Cualquiera de las partes puede terminar este acuerdo con 30 dÃ­as de aviso por escrito. Cualquier transacciÃ³n pendiente al momento de la terminaciÃ³n permanecerÃ¡ sujeta a los tÃ©rminos de comisiÃ³n aquÃ­ establecidos." },
        { heading: "9. RESOLUCIÃ“N DE DISPUTAS", content: "Cualquier disputa que surja de este acuerdo se resolverÃ¡ mediante arbitraje vinculante de acuerdo con las leyes del Estado de California y las leyes aplicables de MÃ©xico para propiedades ubicadas en el mismo." },
        { heading: "10. INDEMNIZACIÃ“N", content: "El Agente acepta indemnizar y eximir de responsabilidad a la Plataforma de cualquier reclamo, daÃ±o o responsabilidad que surja de informaciÃ³n inexacta de la propiedad, listados no autorizados o incumplimiento del deber fiduciario con los clientes." }
      ],
      acknowledgment: "Al firmar a continuaciÃ³n, el Agente reconoce que ha leÃ­do, entendido y acepta estar obligado por todos los tÃ©rminos y condiciones establecidos en este Acuerdo. El Agente certifica que tiene la autoridad para celebrar este acuerdo y que toda la informaciÃ³n proporcionada es verdadera y precisa.",
      signatureLabel: "Firma del Agente (Escriba Nombre Completo)",
      dateLabel: "Fecha",
      agreeCheckbox: "He leÃ­do y acepto los tÃ©rminos y condiciones de este Acuerdo Exclusivo de Listado y ComisiÃ³n",
      submitButton: "Firmar y Enviar Acuerdo",
      footer: "Este acuerdo se rige por las leyes del Estado de California, EE.UU., y las leyes aplicables de MÃ©xico. Para preguntas sobre este acuerdo, contacte legal@auditdna.com"
      title: "ACUERDO EXCLUSIVO DE LISTADO Y COMISIÃƒÆ’Ã¢â‚¬Å“N",
      subtitle: "AuditDNA Elite - Plataforma de Bienes RaÃƒÆ’Ã‚Â­ces en MÃƒÆ’Ã‚Â©xico",
      recitals: "Este Acuerdo se celebra entre el Agente de Bienes RaÃƒÆ’Ã‚Â­ces firmante (\"Agente\") y la Plataforma AuditDNA Elite (\"Plataforma\"), operada por Everwise Home Loans & Realty.",
      terms: [
        { heading: "1. ESTRUCTURA DE COMISIÃƒÆ’Ã¢â‚¬Å“N", content: "El Agente acepta una divisiÃƒÆ’Ã‚Â³n de comisiÃƒÆ’Ã‚Â³n 50/50 en todas las transacciones originadas a travÃƒÆ’Ã‚Â©s de esta Plataforma. La comisiÃƒÆ’Ã‚Â³n total se dividirÃƒÆ’Ã‚Â¡ equitativamente entre el Agente y la Plataforma al cierre exitoso de cualquier propiedad listada aquÃƒÆ’Ã‚Â­." },
        { heading: "2. SERVICIOS DE LA PLATAFORMA", content: "La Plataforma se compromete a proporcionar: (a) Visibilidad del listado de propiedades en mercados de MÃƒÆ’Ã‚Â©xico y EE.UU., (b) Servicios de marketing y promociÃƒÆ’Ã‚Â³n, (c) CoordinaciÃƒÆ’Ã‚Â³n de financiamiento a travÃƒÆ’Ã‚Â©s de servicios hipotecarios afiliados, (d) GeneraciÃƒÆ’Ã‚Â³n de cÃƒÆ’Ã‚Â³digos QR para marketing de propiedades, (e) Sistema seguro de gestiÃƒÆ’Ã‚Â³n de documentos, (f) GeneraciÃƒÆ’Ã‚Â³n de prospectos y gestiÃƒÆ’Ã‚Â³n de consultas." },
        { heading: "3. RESPONSABILIDADES DEL AGENTE", content: "El Agente garantiza y declara que: (a) Toda la informaciÃƒÆ’Ã‚Â³n de la propiedad proporcionada es precisa y completa, (b) El Agente ha obtenido la autorizaciÃƒÆ’Ã‚Â³n adecuada del propietario para listar la propiedad, (c) El propietario estÃƒÆ’Ã‚Â¡ informado y consiente la estructura de comisiÃƒÆ’Ã‚Â³n, (d) Se han realizado todas las divulgaciones requeridas al propietario, (e) El Agente responderÃƒÆ’Ã‚Â¡ prontamente a todas las consultas generadas a travÃƒÆ’Ã‚Â©s de la Plataforma." },
        { heading: "4. CLÃƒÆ’Ã‚ÂUSULA DE NO INTERMEDIACIÃƒÆ’Ã¢â‚¬Å“N", content: "La Plataforma se compromete a no contactar directamente a los clientes del Agente excepto para los siguientes propÃƒÆ’Ã‚Â³sitos: (a) Presentar ofertas legÃƒÆ’Ã‚Â­timas de compra, (b) Discutir opciones de financiamiento para compradores calificados, (c) Coordinar visitas a la propiedad a solicitud del Agente. Todas las demÃƒÆ’Ã‚Â¡s comunicaciones se dirigirÃƒÆ’Ã‚Â¡n a travÃƒÆ’Ã‚Â©s del Agente." },
        { heading: "5. AUTORIZACIÃƒÆ’Ã¢â‚¬Å“N DEL PROPIETARIO", content: "El Agente certifica que el propietario ha proporcionado autorizaciÃƒÆ’Ã‚Â³n por escrito para listar la propiedad y estÃƒÆ’Ã‚Â¡ informado de: (a) La estructura de comisiÃƒÆ’Ã‚Â³n y el acuerdo de divisiÃƒÆ’Ã‚Â³n, (b) El papel de la Plataforma en el marketing y promociÃƒÆ’Ã‚Â³n de la propiedad, (c) El potencial de facilitaciÃƒÆ’Ã‚Â³n de financiamiento a travÃƒÆ’Ã‚Â©s de servicios afiliados." },
        { heading: "6. PERÃƒÆ’Ã‚ÂODO DE LISTADO EXCLUSIVO", content: "Este acuerdo otorga a la Plataforma derechos exclusivos de marketing para la propiedad listada por un perÃƒÆ’Ã‚Â­odo de 180 dÃƒÆ’Ã‚Â­as desde la fecha de aprobaciÃƒÆ’Ã‚Â³n, a menos que se termine por acuerdo mutuo por escrito." },
        { heading: "7. TÃƒÆ’Ã¢â‚¬Â°RMINOS DE PAGO", content: "El pago de la comisiÃƒÆ’Ã‚Â³n se procesarÃƒÆ’Ã‚Â¡ dentro de 5 dÃƒÆ’Ã‚Â­as hÃƒÆ’Ã‚Â¡biles despuÃƒÆ’Ã‚Â©s del cierre exitoso y la recepciÃƒÆ’Ã‚Â³n de toda la documentaciÃƒÆ’Ã‚Â³n requerida. El pago se realizarÃƒÆ’Ã‚Â¡ mediante transferencia bancaria o cheque certificado a la cuenta designada del Agente." },
        { heading: "8. TERMINACIÃƒÆ’Ã¢â‚¬Å“N", content: "Cualquiera de las partes puede terminar este acuerdo con 30 dÃƒÆ’Ã‚Â­as de aviso por escrito. Cualquier transacciÃƒÆ’Ã‚Â³n pendiente al momento de la terminaciÃƒÆ’Ã‚Â³n permanecerÃƒÆ’Ã‚Â¡ sujeta a los tÃƒÆ’Ã‚Â©rminos de comisiÃƒÆ’Ã‚Â³n aquÃƒÆ’Ã‚Â­ establecidos." },
        { heading: "9. RESOLUCIÃƒÆ’Ã¢â‚¬Å“N DE DISPUTAS", content: "Cualquier disputa que surja de este acuerdo se resolverÃƒÆ’Ã‚Â¡ mediante arbitraje vinculante de acuerdo con las leyes del Estado de California y las leyes aplicables de MÃƒÆ’Ã‚Â©xico para propiedades ubicadas en el mismo." },
        { heading: "10. INDEMNIZACIÃƒÆ’Ã¢â‚¬Å“N", content: "El Agente acepta indemnizar y eximir de responsabilidad a la Plataforma de cualquier reclamo, daÃƒÆ’Ã‚Â±o o responsabilidad que surja de informaciÃƒÆ’Ã‚Â³n inexacta de la propiedad, listados no autorizados o incumplimiento del deber fiduciario con los clientes." }
      ],
      acknowledgment: "Al firmar a continuaciÃƒÆ’Ã‚Â³n, el Agente reconoce que ha leÃƒÆ’Ã‚Â­do, entendido y acepta estar obligado por todos los tÃƒÆ’Ã‚Â©rminos y condiciones establecidos en este Acuerdo. El Agente certifica que tiene la autoridad para celebrar este acuerdo y que toda la informaciÃƒÆ’Ã‚Â³n proporcionada es verdadera y precisa.",
      signatureLabel: "Firma del Agente (Escriba Nombre Completo)",
      dateLabel: "Fecha",
      agreeCheckbox: "He leÃƒÆ’Ã‚Â­do y acepto los tÃƒÆ’Ã‚Â©rminos y condiciones de este Acuerdo Exclusivo de Listado y ComisiÃƒÆ’Ã‚Â³n",
      submitButton: "Firmar y Enviar Acuerdo",
      footer: "Este acuerdo se rige por las leyes del Estado de California, EE.UU., y las leyes aplicables de MÃƒÆ’Ã‚Â©xico. Para preguntas sobre este acuerdo, contacte legal@auditdna.com"
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!agreed || !signature) {
      alert(language === 'english' ? 'Please check the agreement box and provide your signature.' : 'Por favor marque la casilla de acuerdo y proporcione su firma.');
      return;
    }
    const agreementData = { agentName: agentData.fullName, agentEmail: agentData.email, agentPhone: agentData.phone, agentAgency: agentData.agency, propertyAddress: propertyData.location, signature: signature, date: date, language: language, timestamp: new Date().toISOString(), agreementVersion: '1.0' };
    onAgree(agreementData);
  };

  const currentText = agreementText[language];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-end mb-6">
          <div className="bg-white rounded-lg shadow-sm p-1 flex gap-1">
            <button onClick={() => setLanguage('english')} className={`px-6 py-2 rounded-md font-medium transition-all ${language === 'english' ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white' : 'text-gray-600 hover:bg-gray-100'}`}>English</button>
            <button onClick={() => setLanguage('spanish')} className={`px-6 py-2 rounded-md font-medium transition-all ${language === 'spanish' ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white' : 'text-gray-600 hover:bg-gray-100'}`}>EspaÃ±ol</button>
            <button onClick={() => setLanguage('spanish')} className={`px-6 py-2 rounded-md font-medium transition-all ${language === 'spanish' ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white' : 'text-gray-600 hover:bg-gray-100'}`}>EspaÃƒÆ’Ã‚Â±ol</button>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-8">
            <div className="flex items-center gap-3 mb-2"><FileText className="w-8 h-8" /><h1 className="text-2xl font-bold">{currentText.title}</h1></div>
            <p className="text-purple-100">{currentText.subtitle}</p>
          </div>
          <div className="p-8 space-y-6">
            <div className="bg-gray-50 rounded-lg p-6 border-l-4 border-purple-600"><p className="text-gray-700 leading-relaxed">{currentText.recitals}</p></div>
            <div className="space-y-6">{currentText.terms.map((term, index) => (<div key={index} className="border-b border-gray-200 pb-4 last:border-0"><h3 className="font-bold text-gray-900 mb-2">{term.heading}</h3><p className="text-gray-700 leading-relaxed">{term.content}</p></div>))}</div>
            <div className="bg-yellow-50 rounded-lg p-6 border-l-4 border-yellow-500"><p className="text-gray-800 leading-relaxed font-medium">{currentText.acknowledgment}</p></div>
            <form onSubmit={handleSubmit} className="space-y-6 mt-8 pt-8 border-t-2 border-gray-300">
              <div className="bg-blue-50 rounded-lg p-6 space-y-2">
                <p className="text-sm text-gray-600 font-medium">{language === 'english' ? 'Agent Information:' : 'InformaciÃ³n del Agente:'}</p>
                <p className="text-gray-900"><strong>{language === 'english' ? 'Name:' : 'Nombre:'}</strong> {agentData.fullName}</p>
                <p className="text-gray-900"><strong>{language === 'english' ? 'Agency:' : 'Agencia:'}</strong> {agentData.agency}</p>
                <p className="text-gray-900"><strong>{language === 'english' ? 'Email:' : 'Correo:'}</strong> {agentData.email}</p>
                <p className="text-gray-900"><strong>{language === 'english' ? 'Phone:' : 'TelÃ©fono:'}</strong> {agentData.phone}</p>
                <p className="text-sm text-gray-600 font-medium">{language === 'english' ? 'Agent Information:' : 'InformaciÃƒÆ’Ã‚Â³n del Agente:'}</p>
                <p className="text-gray-900"><strong>{language === 'english' ? 'Name:' : 'Nombre:'}</strong> {agentData.fullName}</p>
                <p className="text-gray-900"><strong>{language === 'english' ? 'Agency:' : 'Agencia:'}</strong> {agentData.agency}</p>
                <p className="text-gray-900"><strong>{language === 'english' ? 'Email:' : 'Correo:'}</strong> {agentData.email}</p>
                <p className="text-gray-900"><strong>{language === 'english' ? 'Phone:' : 'TelÃƒÆ’Ã‚Â©fono:'}</strong> {agentData.phone}</p>
              </div>
              <div className="flex items-start gap-3 bg-gray-50 p-4 rounded-lg">
                <input type="checkbox" id="agree" checked={agreed} onChange={(e) => setAgreed(e.target.checked)} className="mt-1 w-5 h-5 text-purple-600 rounded focus:ring-2 focus:ring-purple-500" required />
                <label htmlFor="agree" className="text-gray-800 font-medium cursor-pointer">{currentText.agreeCheckbox}</label>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <div><label className="block text-sm font-semibold text-gray-700 mb-2">{currentText.signatureLabel} *</label><input type="text" value={signature} onChange={(e) => setSignature(e.target.value)} placeholder={agentData.fullName} className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent font-serif text-lg" required /></div>
                <div><label className="block text-sm font-semibold text-gray-700 mb-2">{currentText.dateLabel}</label><input type="text" value={date} readOnly className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg bg-gray-50 font-medium" /></div>
              </div>
              <button type="submit" disabled={!agreed || !signature} className={`w-full py-4 rounded-lg font-bold text-lg transition-all ${agreed && signature ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:shadow-xl transform hover:-translate-y-0.5' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}><div className="flex items-center justify-center gap-2"><CheckCircle className="w-6 h-6" />{currentText.submitButton}</div></button>
            </form>
            <div className="mt-8 pt-6 border-t border-gray-200"><p className="text-xs text-gray-500 text-center leading-relaxed">{currentText.footer}</p></div>
          </div>
        </div>
        <div className="mt-6 text-center text-sm text-gray-600"><p className="font-semibold">Saul Garcia - NMLS #337526</p><p>Everwise Home Loans & Realty</p><p>AuditDNA Elite Platform</p></div>
      </div>
    </div>
  );
};

export default CommissionAgreement;
