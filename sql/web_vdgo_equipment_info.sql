CREATE VIEW [dbo].[web_vdgo_equipment_info]
AS
SELECT        id_param, id_st, z_num AS factory_num, k_count AS burners_num, Pwr AS power, d_ust AS install_date, d_otkl AS shutdown_date, podvod AS eyeliner_type, dopinf AS extra_info, tip_kam AS camera_type, 
                         m_ust AS install_location, pokaz AS meter_value, d_pokaz AS reading_value, klapan AS valve_presence, kontr_sr AS controlled_env
FROM            dbo.vdg_param
GO