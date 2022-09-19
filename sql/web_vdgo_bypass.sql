CREATE VIEW [dbo].[web_vdgo_bypass]
AS
SELECT     TOP (100) PERCENT dbo.vdg_obj_work.id, dbo.vdg_obj_work.id_object, dbo.vdg_obj_work.id_exec, dbo.vdg_obj_work.type_dog, dbo.vdg_obj_work.date_action, dbo.vdg_obj_work.exec_vdgo, 
                      ISNULL(dbo.web_vdgo_buff_data.exec_vdgo, 0) AS web_exec, ISNULL(dbo.web_vdgo_buff_data.undone_reason, 0) AS undone_reason, ISNULL(dbo.web_vdgo_buff_data.fixed, 0) AS fixed, 
                      CASE WHEN ISNULL(dbo.web_vdgo_buff_data.id, 0) = 0 THEN 0 ELSE 1 END AS is_created
FROM         dbo.vdg_obj_work LEFT OUTER JOIN
                      dbo.web_vdgo_buff_data ON dbo.vdg_obj_work.id = dbo.web_vdgo_buff_data.id_bypass
WHERE     (dbo.vdg_obj_work.type_action = 0)
ORDER BY dbo.vdg_obj_work.date_action
GO