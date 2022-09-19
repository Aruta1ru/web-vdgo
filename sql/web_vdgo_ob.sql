CREATE VIEW [dbo].[web_vdgo_ob]
AS
SELECT     dbo.to_ch_story.id_st, dbo.to_ch_story.id_obj, dbo.to_ch_ob.name_ob, dbo.to_ch_story.kol_oborud, dbo.to_ch_story.dol_ob, dbo.to_ch_story.du, dbo.to_ch_story.do
FROM         dbo.to_ch_story INNER JOIN
                      dbo.to_ch_ob ON dbo.to_ch_story.id_ob = dbo.to_ch_ob.id_ob
WHERE     (dbo.to_ch_ob.kat = 12) AND (dbo.to_ch_story.do > GETDATE())
GO