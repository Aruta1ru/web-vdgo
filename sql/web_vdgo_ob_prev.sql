CREATE VIEW [dbo].[web_vdgo_ob_prev]
AS
SELECT        dbo.vdg_param.id_st, dbo.vdg_izg_old.name_izg, dbo.vdg_param.model
FROM            dbo.vdg_param INNER JOIN
                         dbo.vdg_izg_old ON dbo.vdg_param.id_izg = dbo.vdg_izg_old.id_izg
GO