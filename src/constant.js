export const APP_NAME = 'Hybrone-Sentinel-Petronet'
export const NAVIGATON = [
  // { label: "Takip", route: "tracked" ,disabled:false},
  { label: 'Dashboard', route: '/dashboard/iot', disabled: true },
  { label: 'Liste', route: '/list/iot', disabled: true },
  {
    label: 'Harita',
    route: '/map',
    disabled: true
  },
  { label: 'Servisler', route: '/services', disabled: true },
  { label: 'Depolar', route: '/premises', disabled: true },
  { label: 'Ayarlar', route: '/settings', disabled: true }
  // { label: "Çıkış", route: "/logout" },
]
export const HARDWARE_TYPES = [
  {
    value: 2,
    label: 'KAYIT CİHAZI',
    key: 'CAMERA',
    brands: [
      {
        value: 1,
        label: 'Dahua',
        models: [{ value: 1, label: 'VG-4C2-LRPU-A' }]
      }
    ]
  },
  {
    value: 1,
    label: 'HIRSIZ ALARM PANELİ',
    key: 'PANEL',
    brands: [
      {
        value: 2,
        label: 'Prosec',
        models: [{ value: 2, label: 'PRO-P83' }]
      }
    ]
  }
]
export const DEVICE_TYPES = [
  {
    value: 2,
    label: 'Kayıt Cihazı',
    key: 'camera',
    valid: false,
    route: '/camera'
  },
  {
    id: 3,
    label: 'Kayıt Cihazı',
    key: 'PANEL',
    valid: true,
    route: '/panel'
  },
  {
    id: 3,
    label: 'Sensörler',
    key: 'IOT',
    valid: true,
    route: '/iot'
  }
]
export const DASHBOARD_VARIABLES = {
  HAP: [
    {
      title: 'Genel Cihaz Durumu',
      state: {
        series: {
          total: { label: 'Toplam', value: 10 },
          online: { label: 'Online', value: 5 },
          offline: { label: 'Offline', value: 5 }
        },
        colors: ['#6FCF97', '#E04141', '#A0A0A0', 'rgba(255,87,93,.77)']
        // colors: ['#A0A0A0', 'rgba(255,87,93,.77)']
      }
    },
    {
      title: 'Alarm Durumu',
      state: {
        series: {
          normal: { label: 'Normal', value: 4 },
          alarm: { label: 'Alarm', value: 10 }
        },
        colors: ['#6FCF97', '#E04141', '#A0A0A0', 'rgba(255,87,93,.77)']
        // colors: ['#E04141', 'rgba(255,87,93,.77)']
      }
    },
    {
      title: 'Kurulu/Çözülü Durumu',
      state: {
        series: {
          arm: { label: 'Kurulu', value: 10 },
          disarm: { label: 'Çözülü', value: 10 }
        },
        colors: ['#444444', '#6FCF97', '#E04141', 'rgba(255,87,93,.77)']
      }
    },
    {
      title: 'Enerji Durumu',
      state: {
        series: {
          normal: { label: 'Normal', value: 10 },
          low_charge: { label: 'Enerji Yok', value: 10 }
        },
        colors: ['#007DB7', '#A0A0A0', 'rgba(255,87,93,.77)']
      }
    },
    {
      title: 'Batarya Durumu',
      state: {
        series: {
          normal: { label: 'Normal', value: 10 },
          low: { label: 'Zayıf', value: 10 }
        },
        colors: ['#6FCF97', '#F2994A', 'rgba(255,87,93,.77)']
      }
    },
    {
      title: 'Diğer Durumlar',
      state: {
        series: {
          normal: { label: 'Normal', value: 10 },
          sabotage: { label: 'Sabotaj', value: 10 },
          fault: { label: 'Hata', value: 10 }
        },
        colors: ['#6FCF97', '#E04141', '#9B51E0', 'rgba(255,87,93,.77)']
      }
    }
  ],
  CAMERA: [
    {
      title: 'Genel Cihaz Durumu',
      state: {
        series: {
          total: { label: 'Toplam', value: 10 },
          online: { label: 'Online', value: 5 },
          offline: { label: 'Offline', value: 5 }
        },
        colors: ['#444444', '#6FCF97', '#A0A0A0', 'rgba(255,87,93,.77)']
      }
    },
    {
      title: 'Kayıt Durumu',
      state: {
        series: {
          normal_record: { label: 'Kayıt Yapılıyor', value: 4 },
          alarm: { label: 'Kayıt Yapmıyor', value: 10 }
        },
        colors: ['#007DB7', '#E04141', 'rgba(255,87,93,.77)']
      }
    },
    {
      title: 'Disk Durumu',
      state: {
        series: {
          total: { label: 'Toplam', value: 10 },
          normal_disk: { label: 'Normal', value: 10 },
          fault: { label: 'Hatalı', value: 10 }
        },
        colors: ['#444444', '#6FCF97', '#E04141', 'rgba(255,87,93,.77)']
      }
    },
    {
      title: 'Aktif Kanal Durumu',
      state: {
        series: {
          total: { label: 'Toplam', value: 10 },
          active: { label: 'Aktif', value: 10 },
          pasif: { label: 'Pasif', value: 10 }
        },
        colors: [
          '#444444',
          '#6FCF97',
          '#007DB7',
          '#A0A0A0',
          'rgba(255,87,93,.77)'
        ]
      }
    },
    {
      title: 'Video Analiz Durumları',
      state: {
        series: {
          normal_analysis: { label: 'Normal', value: 10 },
          video_loss: { label: 'Video Kaybı', value: 10 },
          other_state: { label: 'Diğer Durumlar', value: 10 }
        },
        colors: ['#A0A0A0', '#F2994A', 'rgba(255,87,93,.77)']
      }
    },
    {
      title: 'Diğer Durumlar',
      state: {
        series: {
          motion_detect: { label: 'Hareket Algılama', value: 10 },
          sabotage: { label: 'Sabotaj Algılama', value: 10 },
          scene_change: { label: 'Sahne Değişimi', value: 10 }
        },
        colors: ['#A0A0A0', '#E04141', '#9B51E0', 'rgba(255,87,93,.77)']
      }
    }
  ],
  IOT: [
    {
      title: 'Toplam Sensör',
      state: {
        series: {
          total: { label: 'Toplam', value: 10 },
          online: { label: 'Online', value: 5 },
          offline: { label: 'Offline', value: 5 }
        },
        colors: ['#444444', '#6FCF97', '#A0A0A0', 'rgba(255,87,93,.77)']
      }
    },
    {
      title: 'Sensör Pil Durumu',
      state: {
        series: {
          sensor_normal: { label: 'Pil Normal', value: 4 },
          sensor_low: { label: 'Pil Zayıf', value: 10 },
          sensor_alarm: { label: 'Pil Alarmı', value: 10 }
        },
        colors: ['#007DB7', '#E04141', 'rgba(255,87,93,.77)']
      }
    },
    {
      title: 'Gateway Bağlantı Yöntemi',
      state: {
        series: {
          eth: { label: 'Ethernet', value: 10 },
          wifi: { label: 'Wi-Fi', value: 10 },
          m2m: { label: 'M2M', value: 10 }
        },
        colors: ['#444444', '#6FCF97', '#E04141', 'rgba(255,87,93,.77)']
      }
    },
    {
      title: 'Sıcaklık Alarmı',
      state: {
        series: {
          temp_normal: { label: 'Normal', value: 10 },
          temp_alarm: { label: 'Sıcaklık Alarmı', value: 10 }
        },
        colors: [
          '#444444',
          '#6FCF97',
          '#007DB7',
          '#A0A0A0',
          'rgba(255,87,93,.77)'
        ]
      }
    },
    {
      title: 'Nem Alarmı',
      state: {
        series: {
          humidity_normal: { label: 'Normal', value: 10 },
          humidity_alarm: { label: 'Nem Alarmı', value: 10 }
        },
        colors: ['#A0A0A0', '#F2994A', 'rgba(255,87,93,.77)']
      }
    },
    {
      title: 'Tamper',
      state: {
        series: {
          tamper_normal: { label: 'Normal', value: 10 },
          tamper_alarm: { label: 'Tamper Alarmı', value: 10 }
        },
        colors: ['#A0A0A0', '#E04141', '#9B51E0', 'rgba(255,87,93,.77)']
      }
    },
    {
      title: 'Toplam Gateway',
      state: {
        series: {
          total: { label: 'Toplam Gateway', value: 10 },
          online: { label: 'Online Gateway', value: 10 },
          offline: { label: 'Offline Gateway', value: 10 }
        },
        colors: ['#A0A0A0', '#E04141', '#9B51E0', 'rgba(255,87,93,.77)']
      }
    },
    {
      title: 'Gateway Enerji Durumu',
      state: {
        series: {
          normal: { label: 'Normal', value: 10 },
          energy_fault: { label: 'Enerji Yok', value: 10 }
        },
        colors: ['#A0A0A0', '#E04141', '#9B51E0', 'rgba(255,87,93,.77)']
      }
    },
    {
      title: 'Gateway Batarya Durumu',
      state: {
        series: {
          battery_normal: { label: 'Batarya Normal', value: 10 },
          battery_low: { label: 'Batarya Zayıf', value: 10 },
          battery_alarm: { label: 'Batarya Alarm', value: 10 }
        },
        colors: ['#A0A0A0', '#E04141', '#9B51E0', 'rgba(255,87,93,.77)']
      }
    }
  ]
}
export const LIST_FILTER = [
  {
    label: 'ID/LOKASYON GİRİNİZ',
    type: 'input',
    placeholder: 'ID/LOKASYON GİRİNİZ',
    svg_icon: null,
    valid: true
  },
  {
    label: 'Cihaz Tipi',
    type: 'select',
    placeholder: null,
    svg_icon: null,
    valid: true
  },
  {
    label: 'ID/LOKASYON GİRİNİZ',
    type: 'input',
    placeholder: 'ID/LOKASYON GİRİNİZ',
    svg_icon: null,
    valid: true
  },
  {
    label: 'ID/LOKASYON GİRİNİZ',
    type: 'input',
    placeholder: 'ID/LOKASYON GİRİNİZ',
    svg_icon: null,
    valid: true
  }
]

export const DEVICE_STATUS = {
  camera: [
    //   { label: 'Sistem Kuruldu', value: '1' },
    //   { label: 'Sistem Çözüldü', value: '2' }
    {
      label: 'Tüm Durumlar',
      value: 'all_state'
    },
    {
      label: 'Video Kaybı',
      value: 'has_video_loss'
    },
    {
      label: 'Sahne Değişimi',
      value: 'has_scene_change'
    },
    {
      label: 'Hareket Algılama',
      value: 'motion_detect'
    },
    {
      label: 'Video Sabotaj',
      value: 'has_sabotage'
    },
    {
      label: 'Normal',
      value: 'normal'
    },
    {
      label: 'Disk Hatası',
      value: 'disk_error'
    },
    {
      label: 'Ağ Hatası',
      value: 'network_error'
    },
    {
      label: 'Kayıt Hatası',
      value: 'record_error'
    },
    {
      label: 'Zaman Hatası',
      value: 'datetime_error'
    }
  ],
  gateway: [
    {
      label: 'Bağlantı Var',
      key: 'status',
      value: 0
    },
    {
      label: 'Bağlantı Yok',
      key: 'status',
      value: 1
    },
    {
      label: 'Wi-Fi',
      key: 'connection',
      value: 'wifi'
    },
    {
      label: 'Eth',
      key: 'connection',
      value: 'eth'
    },
    {
      label: 'M2M',
      key: 'connection',
      value: 'm2m'
    },
    {
      label: 'Batarya Alarm',
      key: 'battery',
      value: 9
    },
    {
      label: 'Prize Takılı',
      key: 'electric_connection',
      value: true
    },
    {
      label: 'Batarya Aktif',
      key: 'electric_connection',
      value: false
    }
  ]
}
export const PREMISE_DEVICES = [
  {
    id: 1,
    vendor: 'VGuard',
    model: 'VG-4C2P-NVR',
    inventory_no: 4083308,
    serial_no: 123456789,
    hardware_type: 'NVR'
  },
  {
    id: 2,
    vendor: 'VGuard',
    model: 'VG-4C2P-NVR',
    inventory_no: 4083308,
    serial_no: 123456789,
    hardware_type: 'NVR'
  },
  {
    id: 3,
    vendor: 'VGuard',
    model: 'VG-4C2P-NVR',
    inventory_no: 4083308,
    serial_no: 123456789,
    hardware_type: 'NVR'
  },
  {
    id: 5,
    vendor: 'VGuard',
    model: 'VG-4C2P-NVR',
    inventory_no: 4083308,
    serial_no: 123456789,
    hardware_type: 'NVR'
  },
  {
    id: 6,
    vendor: 'VGuard',
    model: 'VG-4C2P-NVR',
    inventory_no: 4083308,
    serial_no: 123456789,
    hardware_type: 'NVR'
  }
]
export const ACTIONS_FIELDS = {
  ACTIONS: [
    {
      cronic_fault: {
        options: [
          { label: 'YES', value: true },
          { label: 'NO', value: false }
        ],
        type: 'selectbox',
        label: 'Raporlanmasın (Kronik Hata)'
      },
      location_off: {
        options: [
          { label: 'YES', value: true },
          { label: 'NO', value: false }
        ],
        type: 'selectbox',
        label: 'Lokasyon Devre Dışı Bırakılsın mı?'
      }
    }
  ],
  SERVICE: [
    {
      state: {
        options: [
          //   { label: 'Genel Kontrol (Bakım)', value: 'general' },
          //   { label: 'Genel Arıza', value: 'general_fault' },
          //   { label: 'Batarya Hatası', value: 'battery_fault' },
          //   { label: 'İletişim Hatası', value: 'communication_fault' }
          {
            label: 'Kamera Arızası',
            value: 'Kamera Arızası'
          },
          {
            label: 'İletişim Arızası',
            value: 'İletişim Arızası'
          },
          {
            label: 'Disk Arızası',
            value: 'Disk Arızası'
          },
          {
            label: 'Kayıt Arızası',
            value: 'Kayıt Arızası'
          },
          {
            label: 'Genel Kontrol',
            value: 'Genel Kontrol'
          }
        ]
      }
    }
  ],
  REPORT: [
    {
      list: {
        options: [
          { label: 'Seçilen Cihazlar', value: 'selected' },
          { label: 'Tüm Cihazlar', value: 'all' }
        ]
      },
      type: {
        options: [
          // { label: "Verimlilik Raporu", value: "efficiency" },
          { label: 'Durum Raporu', value: 'status' }
          // { label: "Arızalı Cihazlar", value: "trouble" },
          // { label: "Alarm Alan Cihazlar", value: "alarmed" },
        ]
      },
      format: {
        options: [
          { label: 'Excel', value: 'excel' },
          { label: 'Csv', value: 'csv' },
          { label: 'Pdf', value: 'pdf' }
        ]
      }
    }
  ]
}

export const INDICATORS = [
  { communication: { status: false, label: 'İletişim' } },
  { energy: { status: false, label: 'Enerji Durumu' } },
  { battery: { status: false, label: 'Batarya Durumu' } },
  // { time: { status: false, label: "Tarih / Saat" } },
  {
    last_signal: {
      status: null,
      label: 'Son Sinyal',
      value: '23.11.2020 12:34'
    }
  }
]

export const SIGNALS_TYPES = [
  // { label: "Kur / Çöz", value: "arm_disarm" },
  // { label: "Zaman", value: "time" },
  // { label: "Enerji", value: "energy" },
  // { label: "İletişim", value: "communication" },
  // { label: "Alarm", value: "alarm" },
  // { label: "Hata", value: "trouble" },
  // { label: "Sabotaj", value: "sabotage" },
  // { label: "Batarya", value: "battery" },
  { label: 'Tüm Durumlar', value: 'all_state' },
  { label: 'Sistem Kuruldu', value: 'arm' },
  { label: 'Sistem Çözüldü', value: 'disarm' },
  { label: 'Alarm', value: 'alarm' },
  { label: 'Enerji Hatası', value: 'energy' },
  { label: 'Batarya Hatası', value: 'battery' },
  { label: 'Hata (Trouble)', value: 'trouble' },
  { label: 'Tarih/Saat Hatası', value: 'time_trouble' },
  { label: 'İletişim Hatası', value: 'communication' },
  { label: 'Sabotaj', value: 'sabotage' },
  { label: 'Sistem Durum', value: 'system_status' },
  { label: 'Bypass', value: 'bypass' }
]
export const PERSONAL_TITLES = [
  { key: 0, label: 'Kullanıcı' },
  { key: 1, label: 'Admin' },
  { key: 1, label: 'Bölge Sorumlusu' },
  { key: 2, label: 'Satış Sorumlusu' }
]
export const USER_PERMISSIONS = {
  IS_ADMIN: [
    {
      title: '',
      key: 'is_admin',
      label: 'Admin Kullanıcısı',
      value: false
    }
  ],
  LİSTE: [
    {
      title: 'Liste',
      key: 'device_list_status_report_create',
      label: 'Cihaz listesi durum raporu oluşturma',
      value: false
    },
    {
      title: 'Liste',
      key: 'device_show_in_map',
      label: 'Harita üzerinde cihazları görüntüleme',
      value: false
    },
    {
      title: 'Liste',
      key: 'device_show_in_dashboard',
      label: 'Cihaz dashboard görüntüleme',
      value: false
    },
    {
      title: 'Liste',
      key: 'device_show_event',
      label: 'Cihaz olaylarını görüntüleme',
      value: false
    },
    {
      title: 'Liste',
      key: 'device_events_status_report_create',
      label: 'Cihaz olayları durum raporu oluşturma',
      value: false
    },
    {
      title: 'Liste',
      key: 'take_snapshot',
      label: 'Anlık görüntü alma',
      value: false
    },
    {
      title: 'Liste',
      key: 'download_record',
      label: 'Kayıt indirme',
      value: false
    },
    {
      title: 'Liste',
      key: 'device_access_web_ui',
      label: 'Cihaz web arayüzüne erişim',
      value: false
    }
  ],
  LOKASYON: [
    {
      title: 'Lokasyon',
      key: 'location_create',
      label: 'Lokasyon oluşturma',
      value: false
    },
    {
      title: 'Lokasyon',
      key: 'location_edit',
      label: 'Lokasyon dünzenleme',
      value: false
    },
    {
      title: 'Lokasyon',
      key: 'location_delete',
      label: 'Lokasyon silme',
      value: false
    }
  ],
  CİHAZ: [
    {
      title: 'Cihaz',
      key: 'device_create',
      label: 'Cihaz oluşturma',
      value: false
    },
    {
      title: 'Cihaz',
      key: 'device_edit',
      label: 'Cihaz düzenleme',
      value: false
    },
    {
      title: 'Cihaz',
      key: 'device_delete',
      label: 'Cihaz silme',
      value: false
    }
  ],
  SERVİS: [
    {
      title: 'Servis',
      key: 'service_create',
      label: 'Servis kaydı oluşturma',
      value: false
    },
    {
      title: 'Servis',
      key: 'service_delete',
      label: 'Servis kaydı silme',
      value: false
    },
    {
      title: 'Servis',
      key: 'service_status_finished',
      label: 'Servis kaydı tamamlama',
      value: false
    },
    {
      title: 'Servis',
      key: 'service_report_create_and_download',
      label: 'Rapor oluşturma ve indirme',
      value: false
    },
    {
      title: 'Servis',
      key: 'service_data_import',
      label: 'Servis verisini içeri aktarma',
      value: false
    }
  ],
  AYARLAR: [
    {
      title: 'Ayarlar',
      key: 'query_period_edit',
      label: 'Sorgu periyodunu düzenleme ',
      value: false
    },
    {
      title: 'Ayarlar',
      key: 'data_export',
      label: 'Veriyi dışarıya aktarma ',
      value: false
    },
    {
      title: 'Ayarlar',
      key: 'data_import',
      label: 'Veriyi içeriye aktarma',
      value: false
    }
  ],
  KULLANICILAR: [
    {
      title: 'Kullanıcılar',
      key: 'user_show_event',
      label: 'Kullanıcı olaylarını görüntüleme',
      value: false
    },
    {
      title: 'Kullanıcı',
      key: 'user_event_export',
      label: 'Kullanıcı olaylarını dışarı aktarma',
      value: false
    },
    {
      title: 'Kullanıcı',
      key: 'user_list_show',
      label: 'Kullanıcı listesini görüntüleme',
      value: false
    },
    {
      title: 'Kullanıcı',
      key: 'user_create',
      label: 'Kullanıcı oluşturma',
      value: false
    },
    {
      title: 'Kullanıcı',
      key: 'user_delete',
      label: 'Kullanıcı silme',
      value: false
    }
  ]
}
