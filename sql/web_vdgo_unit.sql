CREATE VIEW [dbo].[web_vdgo_unit]
AS
SELECT        id_unit, im_full, im
FROM            dog.dbo.to_unit62
WHERE        (use_job = 1)
GO
