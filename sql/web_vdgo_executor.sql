CREATE VIEW [dbo].[web_vdgo_executor]
AS
SELECT        id_bso_user, fio, dolgn, unit, valid
FROM            dog.dbo.one_bso_user
WHERE        (valid = 1)
GO