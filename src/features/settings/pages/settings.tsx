import { ReactElement, useEffect } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';

import { InputLabel, TextField, Typography } from '@mui/material';

import { MainLayout } from '@/app/layouts/main';
import { Button } from '@/components/button';

import { JiraConfig } from '../types';

const defaultValues = { apiToken: '', projectKey: '', baseUrl: '' };
const labelMinWidth = 150;
const textFieldSx = { minWidth: 300, width: '50%' };

export const SettingsPage = (): ReactElement => {
  const {
    handleSubmit,
    control,
    reset,
    formState: { dirtyFields },
  } = useForm<JiraConfig>({ defaultValues });

  const onSubmit: SubmitHandler<JiraConfig> = (data) => {
    localStorage.setItem('jiraSettings', JSON.stringify(data));
    reset({}, { keepValues: true, keepDirty: false, keepDefaultValues: true });
  };

  useEffect(() => {
    const jiraSettingsJson = localStorage.getItem('jiraSettings');
    if (jiraSettingsJson) {
      try {
        const settings = JSON.parse(jiraSettingsJson);
        reset(settings);
      } catch (error) {
        console.error(error);
      }
    }
  }, [reset]);

  const isDirty = !!Object.keys(dirtyFields).length;

  return (
    <MainLayout>
      <Typography variant="h4" textAlign="center" sx={{ marginBottom: 4 }}>
        JIRA Settings
      </Typography>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-4">
          <Controller
            name="baseUrl"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <div className="flex items-center">
                <InputLabel shrink={false} htmlFor={'baseUrl'} sx={{ minWidth: labelMinWidth }}>
                  Base url
                </InputLabel>
                <TextField {...field} sx={textFieldSx} label="Base url" />
              </div>
            )}
          />
          <Controller
            name="projectKey"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <div className="flex items-center">
                <InputLabel shrink={false} htmlFor={'projectKey'} sx={{ minWidth: labelMinWidth }}>
                  Project Key
                </InputLabel>
                <TextField {...field} sx={textFieldSx} label="Project key" />
              </div>
            )}
          />
          <Controller
            name="apiToken"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <div className="flex items-center">
                <InputLabel shrink={false} htmlFor={'apiToken'} sx={{ minWidth: labelMinWidth }}>
                  Api Token
                </InputLabel>
                <TextField {...field} sx={textFieldSx} label="Api Token" type="password" />
              </div>
            )}
          />
        </div>
        <Button type="submit" variant="contained" sx={{ marginTop: 2 }} disabled={!isDirty}>
          Save
        </Button>
      </form>
    </MainLayout>
  );
};
