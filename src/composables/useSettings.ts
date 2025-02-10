import { ref, watch } from 'vue';

interface SettingsMap {
  general: GeneralSettings;
  privacy: PrivacySettings;
  notifications: NotificationsSettings;
}

type SettingsKey = keyof SettingsMap;

interface GeneralSettings {
  username: string;
  email: string;
  about: string;
  gender: string;
  country: string;
}

interface NotificationsSettings {
  email: boolean;
  sms: boolean;
}

interface PrivacySettings {
  visibility: Visibility;
  searchEngineIndexing: boolean;
}

type Visibility = 'public' | 'private';

const init = <T extends SettingsKey>(key: T, defaults: SettingsMap[T]) => {
  const stored = localStorage.getItem(key);
  return stored !== null ? JSON.parse(stored) : defaults;
};

const general = ref<GeneralSettings>(
  // init<GeneralSettings>('general', {
  init('general', {
    about: '',
    country: 'USA',
    gender: 'male',
    email: '',
    username: '',
  }),
);


const watcher =
  <T extends SettingsKey>(key: T) =>
  (value: SettingsMap[T]) => {
    localStorage.setItem(key, JSON.stringify(value));
  };

watch(general, watcher('general'), { deep: true });

const notifications = ref<NotificationsSettings>(
  init('notifications', {
    email: false,
    sms: false,
  }),
);

watch(notifications, watcher('notifications'), { deep: true });

const privacy = ref<PrivacySettings>(
  init('privacy', {
    searchEngineIndexing: false,
    visibility: 'public',
  }),
);

watch(privacy, watcher('privacy'), { deep: true });

export function useSettings() {
  return {
    general,
    notifications,
    privacy,
  };
}

